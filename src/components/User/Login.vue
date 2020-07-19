<template>
  <div>
    <div class="text-h6 text-center">
      {{ $t('login.loginTitle') }}
    </div>

    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div id="inputsL" class="column items-center">
        <q-input
          filled
          name="username"
          v-model="name"
          :label="$t('login.name')"
          :hint="$t('login.name_hint')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('login.name_val') ]"
          ></q-input>

        <q-input
          filled
          name="password"
          :type="isPwd ? 'password' : 'text'"
          v-model="pwd"
          :label="$t('login.pwd')"
          :hint="$t('login.pwd_hint')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('login.pwd_val') ]"
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

      <div class="row justify-center">
        <q-btn
          class="col-5 col-md-2"
          :label="$t('login.submit_login')"
          type="submit"
          color="primary"></q-btn>
        <q-btn
          class="col-5 col-md-2"
          :label="$t('login.reset')"
          type="reset"
          color="primary"
          flat></q-btn>
      </div>
    </q-form>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      name: null,
      pwd: null,
      isPwd: true
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser']),
    ...mapGetters('appStatus', ['getBaseURL']),

    // 1. Envía una petición de inicio de sesión al servicio indicado por 'baseURL',
    // notifica del resultado de la operación y actualiza 'lastError' si fuera necesario.
    //
    // 2. Carga la configuración de usuario devuelta, priorizando la que se almacena en local.
    onSubmit () {
      const baseURL = this.getBaseURL()
      const url = baseURL + this.resource
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

          if (error.response) {
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

    // Limpia el contenido introducido en los campos de datos usados para el inicio de sesión
    onReset () {
      this.name = null
      this.pwd = null
    }
  },

  // - resource: PATH de la URI en la que realizar el inicio de sesión
  props: ['resource']
}
</script>
