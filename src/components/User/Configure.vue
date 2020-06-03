<template>

  <div
    class="q-gutter-md"
    >
    <q-btn
      clas="text-h5 text-center"
      :label="$t('configuration.configuration')"
      @click="dialog = true"
      icon="settings"
      >
      <q-tooltip
        content-class="bg-white text-primary">
        {{ $t('configuration.configuration') }}
      </q-tooltip>
    </q-btn>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      @keyup.esc="dialog = false"
      >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          v-if="user">
          <div class="text-h6">{{ $t('login.user') + ": " + user.un }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn
            v-if="user"
            icon-right="cloud_upload"
            :label="$t('login.upload')"
            @click="onSubmit">
            <q-tooltip
              content-class="bg-white text-primary">{{ $t('login.upload') }}</q-tooltip>
          </q-btn>

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

          <q-input
            v-model="baseURL"
            filled
            type="url"
            placeholder="https://world.openfoodfacts.org"
            :label="$t('configuration.baseURL')"
            :hint="$t('configuration.baseURL_hint')"
            />

          <q-input
            v-model.number="historySize"
            filled
            type="number"
            :label="$t('configuration.historySize')"
            :hint="$t('configuration.historySize_hint')"
            />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',

  data () {
    return {
      dialog: false,
      langOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ],
      maximizedToggle: true
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
        this.$store.commit('appStatus/setLanguage', val)
      }
    }
  },

  watch: {
    lang: function (lang) {
      this.$i18n.locale = lang
      this.conf.lang = lang
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser', 'updateConfiguration']),
    ...mapGetters('appStatus', ['getLoggedInUser', 'getBaseURL', 'getHistorySize', 'getConfiguration']),

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
          console.log(error)
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

  props: ['resource', 'user']
}
</script>
