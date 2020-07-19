<template>
  <q-btn
    rounded
    dense
    size="md"
    :label="label"
    :class="{ clsDesconocido: desconocido, clsRojo: noEs, clsVerde: !(desconocido || noEs) }">
      <q-tooltip>{{ traducir(ai) }}</q-tooltip>
    </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'

export default {
  name: 'AnalisisIngredientes',

  computed: {
    // Devuelve el icono correspondiente a la categoría de análisis
    icono () {
      if (this.ai.includes('palm')) {
        return ''
      } else if (this.ai.includes('vegan')) {
        return ''
      } else {
        return ''
      }
    },
    // Devuelve la etiqueta correspondiente a la categoría de análisis
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
    // Devuelve el valor booleano que indica si el valor de la categoría de análisis es desconocido
    desconocido () {
      return this.ai.includes('unknow')
    },
    // Devuelve el valor booleano que indica si el valor de la categoría de análisis es cierta
    noEs () {
      return this.ai.includes('non')
    },
    // devolver el valor de lang almacenado
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

    // traduce el valor de la categoría del análisis
    traducir (valor) {
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
