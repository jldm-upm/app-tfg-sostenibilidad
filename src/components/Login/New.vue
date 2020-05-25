<template>
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
        name="username"
        v-model="name"
        :label="$t('login.name')"
        :hint="$t('login.name_hint')"
        lazy-rules
        :rules="[ val => val && val.length > 0 || $t('login.name_val') ]"
        />

      <q-input
        filled
        name="password"
        type="password"
        v-model="pwd"
        :label="$t('login.pwd')"
        :hint="$t('login.pwd_hint')"
        lazy-rules
        :rules="[
                val => val !== null && val !== '' ||  $t('login.pwd_val'),
                val => val.length >= 8 || $t('login.pwd_val2')
                ]"
        />

      <q-input
        v-if="pwd"
        filled
        name="password2"
        type="password"
        v-model="pwd2"
        :label="$t('login.pwd2')"
        :hint="$t('login.pwd_hint2')"
        lazy-rules
        :rules="[
                val => val !== null && val !== '' ||  $t('login.pwd_val'),
                val => val.length >= 8 || $t('login.pwd_val2')
                ]"
        />

      <q-toggle
        v-model="accept"
        name="accepted"
        :label="$t('login.accept')"
        >
        <a href="/help#terms">
          {{ $t('login.readterms') }}
        </a>
      </q-toggle>

      <div>
        <q-btn
          :label="$t('login.submit_new')"
          type="submit"
          color="primary"/>
        <q-btn
          :label="$t('login.reset')"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'New',

  data () {
    return {
      name: null,
      pwd: null,
      pwd2: null,
      accept: null
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser']),
    ...mapGetters('appStatus', ['getBaseURL']),

    onSubmit () {
      const baseURL = this.getBaseURL()
      const url = baseURL + '/newuser'
      const postData = { username: this.name, password: this.pwd }

      if (this.pwd !== this.pwd2) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('login.diffpwd')
        })

        return 0
      }

      if (!(this.accept)) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('login.notaccepted')
        })

        return 0
      }

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
