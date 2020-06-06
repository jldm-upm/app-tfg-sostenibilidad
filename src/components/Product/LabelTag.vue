<template>
  <q-btn
    rounded
    dense
    class="recuadro_label"
    >
    {{ traducir(label, "labels") }}
  </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'LabelTag',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxLabels']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxLabels()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  props: ['label']
}
</script>

<style>
.recuadro_label {
    padding-left: 10px;
    padding-right: 10px;
    background-color: green;
    color: white;
}
</style>
