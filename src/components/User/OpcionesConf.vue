<template>
  <q-list
    class=column>
    <q-item>
      <q-select
        v-model="lang"
        :options="langOptions"
        :label="this.$t('configuration.language')"
        dense
        borderless
        emit-value
        map-options
        options-dense
        style="min-width: 150px"
        />
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model="baseURL"
        filled
        type="url"
        placeholder="https://world.openfoodfacts.org"
        :label="$t('configuration.baseURL')"
        :hint="$t('configuration.baseURL_hint')"
        />
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model.number="historySize"
        filled
        type="number"
        :label="$t('configuration.historySize')"
        :hint="$t('configuration.historySize_hint')"
        />
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model.number="pageSize"
        filled
        type="number"
        :label="$t('configuration.pageSize')"
        :hint="$t('configuration.pageSize_hint')"
        />
    </q-item>
    <fieldset>
      <legend>{{ $t('configuration.sustainability') }}</legend>
      <cuantificacion-sostenibilidad
        v-for="k in Object.keys(sustainTax)"
        :key=k
        :sus=k
        />
    </fieldset>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OpcionesConf',

  data () {
    return {
      langOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
    }
  },

  computed: {
    baseURL: {
      get () {
        return this.$store.state.appStatus.configuration.baseURL
      },
      set (val) {
        this.$store.commit('appStatus/setBaseURL', val)
      }
    },
    historySize: {
      get () {
        return this.$store.state.appStatus.configuration.historySize
      },
      set (val) {
        this.$store.commit('appStatus/setHistorySize', val)
      }
    },
    pageSize: {
      get () {
        return this.$store.state.appStatus.configuration.pageSize
      },
      set (val) {
        this.$store.commit('appStatus/setPageSize', val)
      }
    },
    lang: {
      get () {
        return this.$i18n.locale
      },
      set (val) {
        this.$i18n.locale = val
      }
    },
    sustainTax () {
      return this.getTaxSustainability()
    }
  },

  watch: {
    lang: function (lang) {
      this.$i18n.locale = lang
      this.$store.commit('appStatus/setLanguage', lang)
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxSustainability'])
  },

  components: {
    'cuantificacion-sostenibilidad': require('src/components/User/CUserSostenibilidad.vue').default
  },

  props: ['resource', 'user']
}
</script>
