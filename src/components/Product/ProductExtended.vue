<template>
  <product-resumen
    :producto="producto"
    >
  </product-resumen>
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
    'product-resumen': require('src/components/Product/ProductResumen.vue').default
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
