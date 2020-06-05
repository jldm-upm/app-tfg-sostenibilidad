<template>
  <div
    class="recuadro_label"
    >
    {{ traducir(label, "labels") }}
  </div>
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
    background-color: green;
    border-radius: 25px;
    color: white;
    padding-left: 24px;
    padding-right: 24px;
}
</style>
