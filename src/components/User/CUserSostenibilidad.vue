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
import { traducirTax } from '../../assets/js/traducir_tax.js'

export default {
  name: 'CUserSostenibilidad',

  data () {
    return {

    }
  },

  computed: {
    // devolver la configuración de usuario almacenada
    conf () {
      return this.getConfiguration()
    },

    // devuelve una descripción internacionalizada para la categoría de sostenibilidad
    hintSus () {
      return this.descripcion(this.sus)
    },

    // devuelve el nombre internacionalizado para la categoría de sostenibilidad
    nombreSus () {
      return this.traducirSostenibilidad(this.sus)
    },

    userSustainability: {
      // devolver el valor de ponderación almacenado para esta categoría de sostenibilidad
      get () {
        return this.conf.sustainability[this.sus]
      },
      // almacenar el valor de ponderación para esta categoría de sostenibilidad
      set (val) {
        this.setUserSustainability({ sustainability: this.sus, value: val })
      }
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setUserSustainability']),
    ...mapGetters('appStatus', ['getLoggedInUser', 'getConfiguration', 'getLanguage']),
    ...mapGetters('taxonomias', ['getTaxSustainability']),

    // traduce la sostenibilidad
    traducirSostenibilidad (valor) {
      const tax = this.getTaxSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    },

    // devuelve una descripción internacionalizada de la sostenibilidad
    descripcion (sus) {
      const tax = this.getTaxSustainability()
      return tax[sus].description[this.getLanguage()]
    }
  },

  // - sus: simbolo de la categoría de sostenibilidad que se está configurando
  props: ['sus']
}
</script>
