<template>
  <q-btn
    rounded
    dense
    class="recuadro_label"
    >
    {{ traducir(label, "labels") }}
    <q-tooltip
      content-class="bg-white text-primary">{{ auth_name }}</q-tooltip>
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
    padding-left: 4px;
    padding-right: 4px;
    background-color: green;
    color: white;
}
</style>
