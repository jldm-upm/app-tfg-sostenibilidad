<template>
  <q-btn
    rounded
    dense
    class="recuadro_label"
    >
    {{ traducirTaxLabel(label) }}
    <q-tooltip
      content-class="bg-white text-primary">{{ auth_name }}</q-tooltip>
  </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'

export default {
  name: 'LabelTag',

  data () {
    return {

    }
  },

  computed: {
    // devuelve la entidad autorizadora de la etiqueda
    auth_name () {
      const tax = this.getTaxLabels()
      let res = ''
      if (tax) {
        if (tax[this.label]) {
          res = tax[this.label].auth_name || ''
        }
      }
      return res
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxLabels']),

    // traduce la etiqueta
    traducirTaxLabel (valor) {
      const tax = this.getTaxLabels()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  // - label: símbolo de la etiqueta a mostrar
  props: ['label']
}
</script>

<style>
.recuadro_label {
    padding-left: 4px;
    padding-right: 4px;
    background-color: green;
    color: white;
}
</style>
