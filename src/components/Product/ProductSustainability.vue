<template>
  <div>
    <div>
      <slot>{{ $t('product.ingredients') }}</slot>
    </div>
    <div class="column">
      <q-list
        bordered separator
        v-if="producto.sustainability"
        >
        <votable-sus
          v-for="k in Object.keys(sustain_tax)"
          :key=k
          :codigo=codigo
          :sus=k
          :val="valor(k)"
          :nombre="traducirSostenibilidad(k)"
          :description="sustain_tax[k].description[getLanguage()]"
          :votg="votaciones(k)"
          >
          <q-tooltip content-class="bg-white text-primary">{{ sustain_tax[k].description[getLanguage()] }}</q-tooltip>
        </votable-sus>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'
import { productoVacio } from '../../assets/js/producto_vacio.js'

export default {
  name: 'ProductSustainability',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxSustainability']),
    ...mapGetters('appStatus', ['getActiveProduct', 'getVot', 'getLanguage']),

    // devuelve el valor booleano de la votación del usuario para una categoría de sostenibilidad
    //
    // Parámetros:
    //  - key: símbolo de la categoría de sostenibilidad
    // Devuelve:
    //   El valor booleano que correspinde con la votación del usuario
    valor (key) {
      if (!(this.votaciones_usuario)) {
        return null
      }
      if (!(this.votaciones_usuario[this.codigo])) {
        return null
      }
      const s = this.votaciones_usuario[this.codigo][key]
      if (typeof (s) === 'boolean') {
        return s
      } else if (s === 'true') {
        return true
      } else if (s === 'false') {
        return false
      } else {
        return null
      }
    },

    // Devuelve las votaciones recibidas por el producto para la categoría de sostenibilidad
    //
    // Parámetros:
    //  - key: símbolo de la categoría de sostenibilidad
    // Devuelve:
    //  Un objeto con las votaciones (positivas, negativas y neutras) recibidas por el producto.
    //  El objeto tiene los campos: {true:..., null:...,false:...}
    votaciones (key) {

      const res = {}
      if (this.producto) {
        res.true = this.producto.sustainability[key + '_true'] || 0
        res.null = this.producto.sustainability[key + '_null'] || 0
        res.false = this.producto.sustainability[key + '_false'] || 0
      }

      return res
    },

    // Devuelve la traducción de la sostenibilidad
    traducirSostenibilidad (valor) {
      const tax = this.getTaxSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  computed: {
    // Devuelve el objeto con todos los datos de la taxonomía de sostenibilidad
    sustain_tax () {
      return this.getTaxSustainability()
    },
    // Devuelve el producto del que se muestran los datos de sostenibilidad
    producto () {
      return this.getActiveProduct() || productoVacio()
    },
    // Devuelve el código del producto
    codigo () {
      return this.producto.code
    },
    // devolver el valor de vot (con las votaciones del usuario a los productos) almacenado
    votaciones_usuario () {
      return this.getVot()
    },
    // devuelve las votaciones del usuario para el producto actual
    votaciones_usuario_producto () {
      // console.log(`${JSON.stringify(this.votaciones_usuario)} ${this.codigo}`)
      const res = this.votaciones_usuario[this.codigo]
      if (!res) {
        return {}
      } else {
        return res
      }
    }
  },

  components: {
    'votable-sus': require('src/components/Product/VotableSus.vue').default
  }
}
</script>
