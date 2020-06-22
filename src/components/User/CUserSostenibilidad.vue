<template>
  <q-item>
    <q-input
      debounce="1000"
      v-model.number="userSustainability"
      filled
      type="number"
      style="width: 250px"
      :label="nombreSus"
      :hint="hintSus"
      min="0"
      max="10"
      />
  </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { traducirTax } from '../traducir_tax.js'

export default {
  name: 'CUserSostenibilidad',

  data () {
    return {

    }
  },

  computed: {
    conf () {
      return this.getConfiguration()
    },

    hintSus () {
      return this.descripcion(this.sus)
    },

    nombreSus () {
      return this.traducir(this.sus, 'taxonomias')
    },

    userSustainability: {
      get () {
        return this.conf.sustainability[this.sus]
      },
      set (val) {
        this.setUserSustainability({ sustainability: this.sus, value: val })
      }
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setUserSustainability']),
    ...mapGetters('appStatus', ['getLoggedInUser', 'getConfiguration', 'getLanguage']),
    ...mapGetters('taxonomias', ['getTaxSustainability']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    },

    descripcion (sus) {
      const tax = this.getTaxSustainability()
      return tax[sus].description[this.getLanguage()]
    }
  },

  props: ['sus']
}
</script>
