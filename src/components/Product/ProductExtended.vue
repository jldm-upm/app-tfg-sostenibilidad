<template>
  <q-list
    padding
    bordered
    class="rounded-borders">

    <q-item>
      <q-item-section>
        <product-resumen
          :producto=product
          >
        </product-resumen>
      </q-item-section>

    </q-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="info"
      :label="$t('product.categories')"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          <q-list
            v-if="product"
            >
            <q-item
              dense
              v-for="category in product.categories_tags"
              :key="category"
              >
              {{ category | traducir 'taxonomies' }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="info"
      :label="$t('product.ingredients')"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          <q-list
            v-if="product">
            <q-item
              dense
              v-for="ingredient in product.ingredients"
              :key="ingredient.id"
              >
              {{ ingredient.text }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="info"
      :label="$t('product.nutriments')"
      header-class="text-purple"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          <q-markup-table
            flat
            bordered>
            <thead class="bg-primary text-white">
              <tr>
                <th class="text-left">{{ $t('product.nutriments') }}</th>
                <th class="text-right">{{ $t('product.nut_100g')}}</th>
                <th class="text-right">{{ $t('product.nut_unit') }}</th>
              </tr>
            </thead>
            <tbody
              v-if="product"
              >
              <tr
                v-for="(nutriment,idx) in nutriments"
                :key="idx">
                <td>{{ $t('nutriments.' + nutriment) }}</td>
                <td class="text-right">{{ product.nutriments[nutriment + "_100g"] }}</td>
                <td class="text-right">{{ product.nutriments[nutriment + '_unit'] }}</td>
              </tr>
            </tbody>
            <tbody
              v-else
              >
              <tr
                v-for="(nutriment,idx) in nutriments"
                :key="idx"
                >
                <td>{{ $t('nutriments.' + nutriment) }}</td>
                <td class="text-right">-</td>
                <td class="text-right">-</td>
              </tr>
            </tbody>
          </q-markup-table>

          <q-markup-table
            flat
            bordered>
            <thead class="bg-primary text-white">
              <tr>
                <th class="text-left">{{ $t('product.nutriments') }}</th>
                <th class="text-right">{{ $t('product.nut_100g')}}</th>
                <th class="text-right">{{ $t('product.nut_unit') }}</th>
              </tr>
            </thead>
            <tbody
              v-if="product"
              >
              <tr
                v-for="(nutriment,idx) in nutriments"
                :key="idx">
                <td>{{ $t('nutriments.' + nutriment) }}</td>
                <td class="text-right">{{ product.nutriments[nutriment + "_100g"] }}</td>
                <td class="text-right">{{ product.nutriments[nutriment + '_unit'] }}</td>
              </tr>
            </tbody>
            <tbody
              v-else
              >
              <tr
                v-for="(nutriment,idx) in nutriments"
                :key="idx"
                >
                <td>{{ $t('nutriments.' + nutriment) }}</td>
                <td class="text-right">-</td>
                <td class="text-right">-</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </q-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    traducir (taxonomia, value) {
      console.log(`Traducir: ${value}`)
      const tax = this.getAndUpdateTaxonomia(taxonomia)
      let res = value
      if (value) {
        res = this.getTraduccion(tax, value, this.lang)
      }
      console.log(`Traducido: ${res}`)
      return res
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getLanguage']),
    ...mapActions('appStatus', ['getAndUpdateTaxonomia']),

    getTraduccion (taxonomia, val, lang) {
      return taxonomia[val].name[lang]
    }
  },

  props: ['product']
}
</script>
