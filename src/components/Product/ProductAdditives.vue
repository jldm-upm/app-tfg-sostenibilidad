<template>
  <q-card>
    <q-card-section>
      <slot/>
    </q-card-section>
    <q-card-section>
      <q-btn
        disabled
        v-for="ad in aditivos"
        :key="ad"
        :label="traducirIngrediente(ad)"
        />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'

export default {
  name: 'ProductAdditives',

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    // traduce el ingrediente
    traducirIngrediente (valor) {
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  // - aditivos: array de símbolos de aditivos a mostrar
  props: ['aditivos']
}
</script>
