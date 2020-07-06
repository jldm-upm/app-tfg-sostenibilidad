<template>
  <div>
    <q-card>
      <q-card-section>
        <product-categories
          :producto="producto">
        </product-categories>
      </q-card-section>
      <q-card-section>
        <product-resumen
          :producto="producto"
          >
        </product-resumen>
      </q-card-section>
    </q-card>
    <q-tabs
      shrink
      stretch
      inline-label
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      >
      <q-tab name="info" :label="$t('product.info')" />
      <q-tab name="sustainability" :label="$t('product.sustainability')" />
      <q-tab name="ingredients" v-if="$q.screen.gt.sm" :label="$t('product.ingredients')" />
      <q-tab name="nutriments" v-if="$q.screen.gt.sm" :label="$t('product.nutriments')" />

      <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat :label="$t('tab-more')">
          <q-list>
            <q-item clickable @click="tab = 'ingredients'">
              <q-item-section>{{ $t('product.ingredients') }}</q-item-section>
            </q-item>

            <q-item clickable @click="tab = 'nutriments'">
              <q-item-section>{{ $t('product.nutriments') }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="info">
        <more-info
          :producto="producto"
          >
        </more-info>
      </q-tab-panel>

      <q-tab-panel name="sustainability">
        <product-sustainability><div class="text-h6">{{ $t('product.sustainability') }}</div></product-sustainability>
      </q-tab-panel>

      <q-tab-panel name="ingredients">
        <product-ingredients><div class="text-h6">{{ $t('product.ingredients') }}</div></product-ingredients>
      </q-tab-panel>

      <q-tab-panel name="nutriments">
        <product-nutriments><div class="text-h6">{{ $t('product.nutriments') }}</div></product-nutriments>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'

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

    'more-info': require('src/components/Product/MoreInfo.vue').default,

    // 'product-origins': require('src/components/Product/ProductOrigins.vue').default,
    'product-sustainability': require('src/components/Product/ProductSustainability.vue').default,
    'product-ingredients': require('src/components/Product/ProductIngredients.vue').default,
    'product-nutriments': require('src/components/Product/ProductNutriments').default,
    'product-categories': require('src/components/Product/ProductCategories.vue').default
  },

  filters: {
    traducir (value, taxonomia) {
      const tax = this.getAndUpdateTaxonomia(taxonomia)
      let res = value
      if (value) {
        res = traducirTax(value, tax, this.lang)
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
