<template>
  <div>
    <slot/>
    <q-table
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      row-key="name"
      :no-data-label="$t('nodata')"
      :rows-per-page-label="$t('product.ingredients_cols.rowsperpage')"
      :pagination="{ rowsPerPage: 0 }"
      :hide-bottom="true"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { productoVacio } from '../../pages/producto_vacio.js'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'ProductIngredients',

  data () {
    return {
      columns: [
        {
          name: 'ingredient',
          required: true,
          label: this.$t('product.ingredients_cols.ingredient'),
          align: 'left',
          field: row => row.name,
          format: val => { return (this.traducir(val, 'ingredients') || val) },
          sortable: false
        },
        { name: 'percent_min', align: 'center', label: this.$t('product.ingredients_cols.min'), field: 'percent_min', sortable: false },
        { name: 'percent_max', label: this.$t('product.ingredients_cols.max'), field: 'percent_max', sortable: false }
      ]
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct']),
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  computed: {
    producto () {
      return (this.getActiveProduct() || productoVacio())
    },

    data () {
      const res = this.producto.ingredients.map((ing) => {
        return {
          name: ing.id,
          percent_min: ing.percent_min,
          percent_max: ing.percent_max
        }
      })

      return res
    }
  }
}
</script>
