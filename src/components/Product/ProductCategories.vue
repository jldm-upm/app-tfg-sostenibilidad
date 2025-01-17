<template>
  <div>
    <q-tree
      :nodes="categories_tree"
      node-key="label"
      :no-nodes-label="$t('product.categories_empty')"
      :expanded.sync="expanded">
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-btn :icon="prop.node.icon || 'search'"
                 color="orange"
                 size="sm"
                 class="q-mr-sm"
                 to="/list"
                 @click.stop="buscarCategoria(prop.node)"/>
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>
    </q-tree>
    <q-tooltip content-class="bg-white text-primary">{{ $t('product.categories') }}</q-tooltip>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'
import { buscarCategoriaSostenible } from '../../assets/js/sostenibilidad.js'

export default {
  name: 'ProductCategories',

  computed: {
    // devuelve la estructura de árbol de las categorías del producto
    categories_tree () {
      const aux = [...this.producto.categories_hierarchy]
      aux.reverse()
      return this.crearArbolCategorias(aux)
    }
  },

  methods: {
    ...mapActions('appStatus', ['setListProducts', 'setLastError']),
    ...mapGetters('appStatus', ['getBaseURL', 'getPageSize', 'getCountry']),
    ...mapGetters('taxonomias', ['getTaxCategories']),

    // Devuelve un array de productos pertenecientes a la categoría indicada.
    async buscarCategoria (categoria) {
      // console.log(`buscarCategoria(${JSON.stringify(categoria)})`)
      const listaProductos = await this.obtenerProductosCategoria(categoria.category)

      this.setListProducts(listaProductos)
    },

    // Realiza la petición al servicio para obtener un array de productos que pertenecen a una categoría.
    // Se encarga de notificar el resultado, actualizando listaProductos con los productos obtenidos del servicio o lastError con el error
    //
    // Parámetros:
    //  - categoria: símbolo de la categoría a requerir
    // Devuelve:
    //  array de productos
    async obtenerProductosCategoria (categoria) {
      // console.log(`obtenerProductosCategoria(${categoria})`)
      let res = null
      let errorLocal = null
      let type = 'possitive'
      let message = `${this.$t('off.search')}`

      this.$q.loading.show()
      const respuesta = await buscarCategoriaSostenible(this.getBaseURL(), categoria, this.getPageSize(), 0, [this.getCountry()])
      this.$q.loading.hide()

      // problema con la respuesta
      if (!respuesta) {
        type = 'negative'
        message = `${this.$t('off.errors.serverProblem')}`
        this.setLastError(`${this.$t('off.errors.serverProblem')} -`)

        res = null
      } else if (respuesta.error) {
        type = 'negative'
        message = `${this.$t('off.errors.serverProblem')} ${respuesta.error}`
        errorLocal = respuesta.error
        if (respuesta.error.response) {
          message = `${this.$t('off.errors.serverProblem')} Http.Status: ${respuesta.error.response.status}`
        } else if (respuesta.error.request) {
          message = `${this.$t('off.errors.serverProblem')} Http: ${JSON.stringify(respuesta.error)}`
        } else {
          message = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
        }

        res = null
      } else if (respuesta.response) {
        res = respuesta.response.data.products
      } else {
        type = 'negative'
        message = `${this.$t('off.errors.serverProblem')}`

        res = null
      }

      this.$q.notify({
        type: type,
        message: message
      })

      this.setLastError(errorLocal)
      return res
    },

    // Crea una estructura de árbol (para ser usado por un componente Quasar q-tree)
    // con las categorías a las que pertenece el producto.
    //
    // Parámetros:
    //  - categorias: array de símbolos de categorias
    // Devuelve:
    //  una estructura de árbol (para ser usado en q-tree) como un array de objetos
    //  que contienen {label:...,category:...,children:[...] }
    crearArbolCategorias (categorias) {
      const res = []
      if (categorias.length > 0) {
        const categoriasNew = [...categorias]
        categoriasNew.splice(0, 1)
        const aux = {
          label: this.traducirCategoria(categorias[0]),
          category: categorias[0],
          children: this.crearArbolCategorias(categoriasNew)
        }
        res.push(aux)
      }
      return res
    },

    // Traduce la categoría
    traducirCategoria (valor) {
      const tax = this.getTaxCategories()
      return traducirTax(valor, tax, this.$i18n.local)
    }
  },

  data () {
    return {
      expanded: []
    }
  },

  // - producto: Producto del que mostrar el árbol de categorías
  props: ['producto']
}
</script>
