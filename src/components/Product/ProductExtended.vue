<template>
  <q-card>
    <q-card-section>
      <product-resumen
        :producto="producto"
        >
      </product-resumen>
    </q-card-section>

    <q-card-section>
      <product-origins :producto=producto></product-origins>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getTraduccion } from './tax.js'

export default {
  data () {
    return {
      lang: this.$i18n.locale,

      nutriments: [
        'carbohydrates',
        'energy',
        'energy-kcal',
        'fat',
        'fiber',
        'proteins',
        'salt',
        'saturated-fat',
        'sodium',
        'sugars']
    }
  },

  components: {
    'product-resumen': require('src/components/Product/ProductResumen.vue').default,
    'product-origins': require('src/components/Product/ProductOrigins.vue').default
  },

  filters: {
    traducir (value, taxonomia) {
      const tax = this.getAndUpdateTaxonomia(taxonomia)
      let res = value
      if (value) {
        res = getTraduccion(tax, value, this.lang)
      }
      return res
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getLanguage']),
    ...mapActions('appStatus', ['getAndUpdateTaxonomia'])
  },

  props: ['producto']
}
</script>
