<template>
  <span class="column">
    <div class="row items-center">
      <span>
        {{ $t('product.ratings.user') }}:
      </span>
      <q-rating
        :value="sustainability_user_lvl"
        readonly
        size="xs"
        color="secondary"
        >
      </q-rating>
    </div>
    <div class="row items-center">
      <span>
        {{ $t('product.ratings.general') }}:
      </span>
      <q-rating
        v-model="sustainability_lvl"
        readonly
        size="xs"
        color="golden"
        >
      </q-rating>
    </div>
  </span>
</template>

<script>
import { calcularSostenibilidadUsuario } from '../../assets/js/sostenibilidad.js'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductRatings',

  methods: {
    ...mapGetters('appStatus', ['getConfiguration']),
    ...mapGetters('taxonomias', ['getTaxSustainability'])
  },

  computed: {
    // devuelve la valoración de sostenibilidad del producto (valor almacenado en el campo:
    // 'sustainability.sustainability_level')
    sustainability_lvl () {
      let res = Math.round(Object.keys(this.getTaxSustainability()).length / 2)
      if (this.producto) {
        if (this.producto.sustainability) {
          if (this.producto.sustainability.sustainability_level) {
            res = this.producto.sustainability.sustainability_level
          }
        }
      }
      return res
    },

    // devuelve la valoración de sostenibilidad del producto (calculado de forma ponderada con
    // las votaciones que tiene el producto y que se almacenan en el campo 'sustainability')
    sustainability_user_lvl () {
      let res = Math.round(Object.keys(this.getTaxSustainability()).length / 2)
      if (this.producto) {
        res = calcularSostenibilidadUsuario(this.producto, this.getConfiguration().sustainability, this.getTaxSustainability())
      }
      return res
    }
  },

  // - producto: Producto del que se mostrará la valoración
  props: ['producto']
}
</script>
