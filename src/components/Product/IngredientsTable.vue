<template>
  <div>
    <slot/>
    <q-table
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      row-key="id"
      :no-data-label="$t('nodata')"
      :rows-per-page-label="$t('product.ingredients_cols.rowsperpage')"
      :pagination="{ rowsPerPage: 0 }"
      :hide-bottom="true"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { productoVacio } from '../../assets/js/producto_vacio.js'
import { traducirTax } from '../../assets/js/traducir_tax.js'

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
          field: row => row.id,
          format: (val, row) => { return (this.traducirIngrediente(val) || row.text || val) },
          sortable: false
        },
        { name: 'percent_min', align: 'center', label: this.$t('product.ingredients_cols.min'), field: 'percent_min', sortable: false, format: (val, row) => { return parseFloat(val).toFixed(3) } },
        { name: 'percent_max', label: this.$t('product.ingredients_cols.max'), field: 'percent_max', sortable: false, format: (val, row) => { return parseFloat(val).toFixed(3) } }
      ]
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct']),
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    // traduce el Ingrediente
    traducirIngrediente (valor) {
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  computed: {
    // devolver el valor de activeProduct almacenado, si no hay ninguno devuelve el producto vacio
    producto () {
      return (this.getActiveProduct() || productoVacio())
    },

    // Devuelve un array con objetos que representan las filas de ingredientes a mostrar.
    // Cada objeto contiene {id:...,text:...,percent_min:...,percent_max:...}
    data () {
      let res = []
      if (this.producto.ingredients) {
        res = this.producto.ingredients.map((ing, index) => {
          return {
            id: ing.id + index,
            text: ing.text,
            percent_min: ing.percent_min,
            percent_max: ing.percent_max
          }
        })
      }
      return res
    }
  }
}
</script>
