<template>
  <div>
    <div class="text-h6">
      {{ $t('login.loginTitle') }}
    </div>

    <div
      class="q-pa-md"
      style="max-width: 400px">

      <q-form
        autofocus
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        >
        <q-input
          filled
          v-model="name"
          :label="$t('login.name')"
          :hint="$t('login.name_hint')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('login.name_val') ]"
          />

        <q-input
          filled
          type="password"
          v-model="pwd"
          :label="$t('login.pwd')"
          :hint="$t('login.pwd_hint')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('login.name_val') ]"
          />
        <div>
          <q-btn
            :label="$t('login.submit')"
            type="submit"
            color="primary"/>
          <q-btn
            :label="$t('login.reset')"
            type="reset"
            color="primary"
            flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      name: null,
      pwd: null
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser']),
    ...mapGetters('appStatus', ['getBaseURL']),

    onSubmit () {
      const baseURL = this.getBaseURL
      const url = baseURL + '/login'
      const postData = { username: this.name, password: this.pwd }

      this.$q.loading.show()
      this.$axios.post(url, postData)
        .then(response => {
          this.$q.loading.hide()
          if (response.data.status === 1) {
            this.setLoggedInUser(response.data)

            this.$q.notify({
              type: 'possitive',
              icon: 'cloud_done',
              message: this.$t('off.loggedin')
            })
          } else {
            this.$q.notify({
              type: 'negative',
              icon: 'cloud_done',
              message: this.$t('off.errors.loggedin')
            })
          }
        })
        .catch(error => {
          this.$q.loading.hide()

          const negType = 'negative'
          let msg = this.$t('off.errors.serverProblem')

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
          this.$q.notify({
            type: negType,
            message: msg
          })
        })
    },

    onReset () {
      this.name = null
      this.pwd = null
    }
  }
}
</script>
