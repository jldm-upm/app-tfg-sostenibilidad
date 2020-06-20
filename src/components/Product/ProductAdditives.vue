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
        :label="traducir(ad, 'ingredients')"
        />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../traducir_tax.js'

export default {
  name: 'ProductAdditives',

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  props: ['aditivos']
}
</script>
