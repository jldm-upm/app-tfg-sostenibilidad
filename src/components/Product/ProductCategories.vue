<template>
  <div>
    <q-tree
      :nodes="categories_tree"
      node-key="label"
      no-connectors
      :expanded.sync="expanded">
      {{ producto.categories_hierarchy }}
    </q-tree>
    <q-tooltip content-class="bg-white text-primary">{{ $t('producto.categories') }}</q-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'ProductCategories',

  computed: {
    categories_tree () {
      return this.crearArbolCategorias(this.producto.categories_hierarchy)
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxCategories']),

    crearArbolCategorias (categorias) {
      const res = []
      if (categorias.length > 0) {
        const categoriasNew = [...categorias]
        categoriasNew.splice(0, 1)
        const aux = { label: this.traducir(categorias[0], 'categories'), children: this.crearArbolCategorias(categoriasNew) }
        res.push(aux)
      }
      return res
    },

    traducir (valor, taxomomia) {
      const tax = this.getTaxCategories()
      return traducirTax(valor, tax, this.$i18n.local)
    }
  },

  data () {
    return {
      expanded: []
    }
  },

  props: ['producto']
}
</script>
