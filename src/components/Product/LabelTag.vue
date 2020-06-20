<template>
  <q-btn
    rounded
    dense
    class="recuadro_label"
    >
    {{ traducir(label, "labels") }}
    <q-tooltip content-class="bg-white text-primary">{{ auth_name }}</q-tooltip>
  </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../traducir_tax.js'

export default {
  name: 'LabelTag',

  data () {
    return {

    }
  },

  computed: {
    taxLabels () {
      return this.getTaxLabels()
    },
    auth_name () {
      const tax = this.taxLabels
      return tax[this.label].auth_name || ''
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxLabels']),

    traducir (valor, taxomomia) {
      const tax = this.taxLabels
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

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
