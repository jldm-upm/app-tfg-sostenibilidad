<template>
  <div>
    <div class="text-h6">
      {{ $t('login.loginTitle') }}
    </div>

    <div
      row
      class="q-pa-md"
      style="max-width: 400px">

      <q-btn
        @click="logOut">
        {{ $t('login.logout') }}
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
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser']),
    ...mapGetters('appStatus', ['getBaseURL', 'getLoggedInUser']),

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
          console.log('Al final')
          this.setLoggedInUser(null)
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
