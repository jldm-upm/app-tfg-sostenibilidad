<template>
  <div>
    <slot>{{ $t('product.nutriments') }}</slot>
    <q-table
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      row-key="name"
      :no-data-label="$t('nodata')"
      :rows-per-page-label="$t('product.nutriments_cols.rowsperpage')"
      :pagination="{ rowsPerPage: 0 }"
      :hide-bottom="true"
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
          format: val => { return (this.$t('product.nutriments_cols.vals.' + val) || val) },
          sortable: false
        },
        { name: 'value', align: 'center', label: this.$t('product.nutriments_cols.value'), field: 'value', sortable: false },
        { name: 'unit', label: this.$t('product.nutriments_cols.unit'), field: 'unit', sortable: false },
        { name: '100g', label: this.$t('product.nutriments_cols.100g'), field: '100g', sortable: false }
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
      const nutrimentsFields = [
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

      const res = nutrimentsFields.map((nut) => {
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
