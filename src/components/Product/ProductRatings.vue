<template>
  <span class="column">
    <div class="row items-center">
      <span
        class="col-sm-3">
        {{ $t('product.ratings.user') }}:
      </span>
      <q-rating
        :value="sustainability_user_lvl"
        readonly
        size="xs"
        color="secondary"
        >
      </q-rating>
      {{ sustainability_user_lvl }}
    </div>
    <div class="row items-center">
      <span
        class="col-sm-3">
        {{ $t('product.ratings.general') }}:
      </span>
      <q-rating
        v-model="sustainability_lvl"
        readonly
        size="xs"
        color="golden"
        >
      </q-rating>
      {{ sustainability_lvl }}
    </div>
  </span>
</template>

<script>
import { calcularSostenibilidadUsuario } from '../sostenibilidad.js'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductRatings',

  methods: {
    ...mapGetters('appStatus', ['getConfiguration']),
    ...mapGetters('taxonomias', ['getTaxSustainability'])
  },

  computed: {
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

    sustainability_user_lvl () {
      let res = Math.round(Object.keys(this.getTaxSustainability()).length / 2)
      if (this.producto) {
        res = calcularSostenibilidadUsuario(this.producto, this.getConfiguration(), this.getTaxSustainability())
      }
      return res
    }
  },

  props: ['producto']
}
</script>
