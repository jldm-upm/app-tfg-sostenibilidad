<template>
  <q-btn
    rounded
    dense
    size="md"
    :label="label"
    :class="{ clsDesconocido: desconocido, clsRojo: noEs, clsVerde: !(desconocido || noEs) }">
      <q-tooltip>{{ traducir(ai, "ingredientsAnalysis") }}</q-tooltip>
    </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../traducir_tax.js'

export default {
  name: 'AnalisisIngredientes',

  computed: {
    icono () {
      if (this.ai.includes('palm')) {
        return ''
      } else if (this.ai.includes('vegan')) {
        return ''
      } else {
        return ''
      }
    },
    label () {
      // :label='traducir(ai, "ingredientsAnalysis")'
      if (this.ai.includes('palm')) {
        return 'PO'
      } else if (this.ai.includes('vegan')) {
        return 'Vg'
      } else {
        return 'Vt'
      }
    },
    desconocido () {
      return this.ai.includes('unknow')
    },
    noEs () {
      return this.ai.includes('non')
    },
    lang () {
      return this.$i18n.locale
    }
  },

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientsAnalysis']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxIngredientsAnalysis()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  props: ['ai']
}
</script>

<style>
.clsVerde {
    color: white;
    background-color: green;
}
.clsDesconocido {
    color: white;
    background-color: gray;
}
.clsRojo {
    color: white;
    background-color: red;
}
</style>
