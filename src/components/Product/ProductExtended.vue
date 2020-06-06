<template>
  <q-card>
    <q-card-section>
      <product-resumen
        :producto="producto"
        >
      </product-resumen>
    </q-card-section>

    <product-ingredients></product-ingredients>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      >
      <q-tab name="sustainability" :label="$t('product.sustainability')" />
      <q-tab name="ingredients" :label="$t('product.ingredients')" />
      <q-tab name="nutriments" :label="$t('product.nutriments')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="sustainability">
        <product-sustainability><div class="text-h6">{{ $t('product.sustainability') }}</div></product-sustainability>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.

      </q-tab-panel>

      <q-tab-panel name="ingredients">
        <product-ingredients><div class="text-h6">{{ $t('product.ingredients') }}</div></product-ingredients>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="nutriments">
        <product-nutriments><div class="text-h6">{{ $t('product.nutriments') }}</div></product-nutriments>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getTraduccion } from './tax.js'

export default {
  data () {
    return {
      lang: this.$i18n.locale,

      tab: 'sustainability',

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
    // 'product-origins': require('src/components/Product/ProductOrigins.vue').default,
    'product-sustainability': require('src/components/Product/ProductSustainability.vue').default,
    'product-ingredients': require('src/components/Product/ProductIngredients.vue').default,
    'product-nutriments': require('src/components/Product/ProductNutriments').default
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
