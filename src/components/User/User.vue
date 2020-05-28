<template>
  <div
    row
    class="q-pa-md"
    style="max-width: 400px">

    <div class="text-h6 text-center">
      {{ $t('login.confTitle') }}
    </div>

    <div>
      <div
        row
        class="q-pa-md">
        <q-btn
          icon-right="close"
          :label="$t('login.logout')"
          @click="logOut">
          <q-tooltip content-class="bg-white text-primary">{{ $t('login.logout') }}</q-tooltip>
        </q-btn>
        <q-btn
          icon-right="cloud_upload"
          :label="$t('login.upload')"
          @click="onSubmit">
          <q-tooltip
            content-class="bg-white text-primary">{{ $t('login.upload') }}</q-tooltip>
        </q-btn>
      </div>

      <q-form
        autofocus
        class="q-gutter-md"
        >

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
          filled
          type="url"
          placeholder="https://world.openfoodfacts.org"
          v-model="conf.baseURL"
          :label="$t('configuration.baseURL')"
          :hint="$t('configuration.baseURL_hint')"
          />

        <q-input
          filled
          type="number"
          v-model.number="conf.historySize"
          :label="$t('configuration.historySize')"
          :hint="$t('configuration.historySize_hint')"
          />

      </q-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',

  data () {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
    }
  },

  watch: {
    lang: function (lang) {
      this.$i18n.locale = lang
      this.conf.lang = lang
    }
  },

  computed: {
    conf () {
      return this.getConfiguration()
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser', 'updateConfiguration']),
    ...mapGetters('appStatus', ['getConfiguration', 'getLoggedInUser', 'getBaseURL']),

    logOut () {
      const baseURL = this.getBaseURL()
      const url = baseURL + this.resource
      const postData = this.getLoggedInUser()

      console.log(JSON.stringify(baseURL))
      console.log(JSON.stringify(postData))

      let type = 'positive'
      let msg = this.$t('off.loggedout')

      this.$q.loading.show()
      this.$axios.post(url, postData)
        .then(response => {
          if (response.data.status === 1) {
            type = 'possitive'
            msg = this.$t('off.loggedout')
          } else {
            type = 'negative'
            msg = `${this.$t('off.errors.loggedout')} ${response.data.status_verbose}`
          }
        })
        .catch(error => {
          this.$q.loading.hide()

          type = 'negative'
          msg = this.$t('off.errors.serverProblem')

          this.setLastError(error)
          console.log(error)
          if (error.response) {
            console.log('error v1')
            msg = `${this.$t('off.errors.serverProblem')} Http.Status: ${error.response.status}`
          } else if (error.request) {
            msg = `${this.$t('off.errors.serverProblem')} Http: ${error.request}`
          } else {
            msg = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
          }
        })
        .then(() => {
          this.$q.loading.hide()
          console.log('Al final')
          this.setLoggedInUser(null)
          this.$q.notify({
            type: type,
            icon: 'cloud_done',
            message: msg
          })
        })
    },

    onSubmit () {

    }
  },

  props: ['resource', 'user']
}
</script>
