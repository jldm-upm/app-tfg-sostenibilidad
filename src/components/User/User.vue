<template>
  <div
    row
    class="q-pa-md"
    style="max-width: 400px">

    <div class="text-h6 text-center">
      {{ $t('login.confTitle') }}
    </div>

    <div
      row
      class="q-pa-md">
      <q-btn
        icon-right="close"
        :label="$t('login.logout')"
        @click="logOut">
        <q-tooltip content-class="bg-white text-primary">{{ $t('login.logout') }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',

  data () {
    return {
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser', 'updateConfiguration']),
    ...mapGetters('appStatus', ['getConfiguration', 'getLoggedInUser', 'getBaseURL']),

    logOut () {
      const baseURL = this.getBaseURL()
      const url = baseURL + this.resource
      const postData = this.getLoggedInUser()

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

          if (error.response) {
            msg = `${this.$t('off.errors.serverProblem')} Http.Status: ${error.response.status}`
          } else if (error.request) {
            msg = `${this.$t('off.errors.serverProblem')} Http: ${error.request}`
          } else {
            msg = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
          }
        })
        .then(() => {
          this.$q.loading.hide()

          this.setLoggedInUser(null)
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
