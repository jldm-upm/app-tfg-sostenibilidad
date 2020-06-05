<template>
  <div
    class="recuadro"
    :class="{ clsDesconocido: desconocido, clsRojo: noEs, clsVerde: !(desconocido || noEs) }"
    >
    {{ traducir(ai, "ingredientsAnalysis") }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'AnalisisIngredientes',

  computed: {
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
      // // console.log(`traducir(${valor},${taxonomia})`)
      // let taxs = null
      // let res = valor
      // switch (taxomomia) {
      //   case 'ingredientsAnalysis':
      //     taxs = this.getTaxIngredientsAnalysis()
      //     res = taxs[valor].name[this.lang] || taxs[valor].name.en
      //     break
      // }
      // console.log(`traducir.res=${res}`)
      // return res
      const tax = this.getTaxIngredientsAnalysis()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  props: ['ai']
}
</script>

<style>
.recuadro {
    border-radius: 25px;
    color: white;
    padding-left: 24px;
    padding-right: 24px;
}

.clsVerde {
    background-color: green;
}
.clsDesconocido {
    background-color: gray;
}
.clsRojo {
    background-color: red;
}
</style>
