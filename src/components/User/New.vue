<template>
  <div
    class="q-pa-md"
    >

    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div id="inputsN" class="column items-center">
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
          :type="isPwd ? 'password' : 'text'"
          v-model="pwd"
          :label="$t('login.pwd')"
          :hint="$t('login.pwd_hint')"
          lazy-rules
          :rules="[
                  val => val !== null && val !== '' ||  $t('login.pwd_val'),
                  val => val.length >= 8 || $t('login.pwd_val2')
                  ]"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              />
          </template>
        </q-input>

        <q-input
          v-if="pwd"
          filled
          name="password2"
          :type="isPwd ? 'password' : 'text'"
          v-model="pwd2"
          :label="$t('login.pwd2')"
          :hint="$t('login.pwd_hint2')"
          lazy-rules
          :rules="[
                  val => val !== null && val !== '' ||  $t('login.pwd_val'),
                  val => val.length >= 8 || $t('login.pwd_val2')
                  ]"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              />
          </template>
        </q-input>
      </div>

      <q-toggle
        v-model="accept"
        name="accepted"
        :label="$t('login.accept')"
        >
      </q-toggle>

      <q-btn dense to="/privacity" :label="$t('login.readterms')"></q-btn>

      <div class="row justify-center">
        <q-btn
          class="col-5 col-md-2"
          :label="$t('login.submit_new')"
          type="submit"
          color="primary">
          <q-tooltip content-class="bg-white text-primary">{{ $t('login.submit_new') }}</q-tooltip>
        </q-btn>
        <q-btn
          class="col-5 col-md-2"
          :label="$t('login.reset')"
          type="reset"
          color="primary"
          flat
          >
          <q-tooltip content-class="bg-white text-primary">{{ $t('login.reset') }}</q-tooltip>
        </q-btn>
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
      isPwd: true,
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
      const url = baseURL + this.resource
      const postData = { username: this.name, password: this.pwd, accepted: this.accept }

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

      let type = ''
      let icon = ''
      let message = ''
      this.$q.loading.show()
      this.$axios.post(url, postData)
        .then(response => {
          this.$q.loading.hide()
          if (response.data.status === 1) {
            this.setLoggedInUser(response.data)

            type = 'possitive'
            icon = 'cloud_done'
            message = this.$t('off.loggedin')
          } else {
            type = 'negative'
            icon = 'cloud_done'
            message = `${this.$t('off.errors.loggedin')} ${response.data.status_verbose}`
          }
        })
        .catch(error => {
          type = 'negative'
          message = this.$t('off.errors.serverProblem')

          this.setLastError(error)

          if (error.response) {
            message = `${this.$t('off.errors.serverProblem')} Http.Status: ${error.response.status}`
          } else if (error.request) {
            message = `${this.$t('off.errors.serverProblem')} Http: ${JSON.stringify(error)}`
          } else {
            message = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
          }
        })
        .then(() => {
          this.$q.loading.hide()

          this.$q.notify({
            type: type,
            icon: icon,
            message: message
          })
        })
    },

    onReset () {
      this.name = null
      this.pwd = null
      this.pwd2 = null
      this.accept = null
    }
  },

  props: ['resource']
}
</script>
