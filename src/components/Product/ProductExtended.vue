<template>
  <q-list
    padding
    bordered
    class="rounded-borders">

    <q-item>
      <q-item-section>
        <product-resumen
          :product=product
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
          <q-list>
            <q-item
              dense
              v-for="category in product.categories_tags"
              :key="category"
              >
              {{ category }}
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
          <q-list>
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
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">{{ $t('product.nutriments') }}</th>
                <th class="text-right">{{ $t('product.nut_100g')}}</th>
                <th class="text-right">{{ $t('product.nut_unit') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(nutriment,idx) in nutriments"
                :key="idx">
                <td>{{ $t('nutriments.' + nutriment) }}</td>
                <td class="text-right">{{ product.nutriments[nutriment + "_100g"]}}</td>
                <td class="text-right">{{ product.nutriments[nutriment + '_unit'] }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </q-list>
</template>

<script>
export default {
  data () {
    return {
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

  props: ['product']
}
</script>
