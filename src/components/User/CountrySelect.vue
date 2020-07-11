<template>
  <q-select
    square outlined
    style="min-width: 150px; max-width: 200px"
    v-model="country"
    :options="countryOptions"
    :label="this.$t('configuration.country')"
    borderless
    emit-value
    map-options
    options-dense
    >
  </q-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getCountries']),
    ...mapGetters('appStatus', ['getCountry', 'getLanguage']),
    ...mapActions('appStatus', ['setCountry'])
  },

  computed: {
    country: {
      get () {
        return this.getCountry()
      },
      set (val) {
        this.setCountry(val)
      }
    },
    countryOptions () {
      const lang = this.getLanguage()
      const allCountriesData = this.getCountries()
      const allCountries = Object.keys(allCountriesData)
      const opciones = allCountries.map(function (cy) {
        const res = {}
        res.value = cy

        res.label = allCountriesData[cy].name[lang]

        return res
      })

      const opcionesOrdenadas = opciones.sort(function (a, b) {
        return a.label < b.label
      })

      return opcionesOrdenadas
    }
  }
}
</script>
