<template>
  <div>
    <product-resumen
      :producto="producto"
      >
    </product-resumen>

    <q-card-section>
      <q-item-label>
        {{ $t('product.origins') }} {{ producto.origins }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
      </q-item-label>
      <q-item-label>
        {{ $t('product.manufactured') }} {{ producto.manufacturing_places }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
      </q-item-label>
    </q-card-section>
  </div>
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
