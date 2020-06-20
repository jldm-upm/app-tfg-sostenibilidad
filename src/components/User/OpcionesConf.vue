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
        v-model.number="historySize"
        filled
        type="number"
        :label="$t('configuration.historySize')"
        :hint="$t('configuration.historySize_hint')"
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
import { mapActions, mapGetters } from 'vuex'

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
    ...mapActions('appStatus', ['setLastError']),
    ...mapGetters('appStatus', ['getBaseURL', 'getConfiguration']),
    ...mapGetters('taxonomias', ['getTaxSustainability']),

    onSubmit () {
      const url = this.getBaseURL() + this.resource
      const postData = { ...this.user, conf: this.getConfiguration() }

      let type = 'positive'
      let msg = this.$t('off.loggedout')

      this.$q.loading.show()
      this.$axios.post(url, postData)
        .then((response) => {
          if (response.data.status === 1) {
            type = 'possitive'
            msg = this.$t('off.usersaved')
          } else {
            type = 'negative'
            msg = `${this.$t('off.errors.loggedout')} ${response.data.status_verbose}`
          }
        })
        .catch((error) => {
          type = 'negative'
          msg = this.$t('off.errors.serverProblem')

          this.setLastError(error)

          if (error.response) {
            msg = `${this.$t('off.errors.serverProblem')} Http.Status: ${error.response.status}`
          } else if (error.request) {
            msg = `${this.$t('off.errors.serverProblem')} Http: ${JSON.stringify(error.request)}`
          } else {
            msg = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
          }
        })
        .then(() => {
          this.$q.loading.hide()

          this.$q.notify({
            type: type,
            icon: 'cloud_done',
            message: msg
          })
        })
    }
  },

  components: {
    'cuantificacion-sostenibilidad': require('src/components/User/CUserSostenibilidad.vue').default
  },

  props: ['resource', 'user']
}
</script>
