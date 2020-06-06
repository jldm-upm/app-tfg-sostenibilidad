<template>
  <div>
    <slot>{{ $t('product.nutriments') }}</slot>
    <q-table
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      row-key="name"
      :no-data-label="$t('nodata')"
      :pagination="{ rowsPerPage: 0 }"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { productoVacio } from '../../pages/producto_vacio.js'

export default {
  name: 'ProductNutriments',

  data () {
    return {
      columns: [
        {
          name: 'nutriment',
          required: true,
          label: this.$t('product.nutriments_cols.nutriment'),
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'value', align: 'center', label: this.$t('product.nutriments_cols.value'), field: 'value', sortable: true },
        { name: 'unit', label: this.$t('product.nutriments_cols.unit'), field: 'unit', sortable: true },
        { name: '100g', label: this.$t('product.nutriments_cols.100g'), field: '100g' }
      ]
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct'])
  },

  computed: {
    producto () {
      return this.getActiveProduct() || productoVacio()
    },

    data () {
      const res = [
        'calcium',
        'carbohydrates',
        'cholesterol',
        'energy',
        'fat',
        'fiber',
        'iron',
        'proteins',
        'salt',
        'saturated-fat',
        'sodium',
        'sugars',
        'trans-fat',
        'vitamin-a',
        'vitamin-c']
        .map((nut) => {
          return {
            name: nut,
            value: this.producto.nutriments[nut + '_value'],
            unit: this.producto.nutriments[nut + '_unit'],
            '100g': this.producto.nutriments[nut + '_100g']
          }
        })

      return res
    }
  }
}
</script>
