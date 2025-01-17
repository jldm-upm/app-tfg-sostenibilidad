<template>
  <div>
    <div
      class="column q-pa-md items-center"
      style="max-width: 400px">
      <div class="text-h6 text-center">
        {{ $t('login.confTitle') }}
      </div>

      <q-btn
        style="width: 250px"
        icon-right="close"
        :label="$t('login.logout')"
        @click="dialogClose = true">
        <q-tooltip content-class="bg-white text-primary">{{ $t('login.logout') }}</q-tooltip>
      </q-btn>
      <q-btn
        style="width: 250px"
        icon-right="close"
        :label="$t('login.deluser')"
        @click="dialogDelete = true">
        <q-tooltip content-class="bg-white text-primary">{{ $t('login.deluser') }}</q-tooltip>
      </q-btn>
    </div>

    <q-dialog v-model="dialogClose" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ $t('login.wantClose') }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="this.$t('cancel')" color="primary" v-close-popup />
          <q-btn @click="logOut" flat :label="this.$t('ok')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ $t('login.wantDelete') }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="this.$t('cancel')" color="primary" v-close-popup />
          <q-btn @click="delUser" flat :label="this.$t('ok')" color="primary" v-close-popup />
        </q-card-actions>
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
      dialogClose: false,
      dialogDelete: false
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setLoggedInUser', 'setVot', 'updateConfiguration']),
    ...mapGetters('appStatus', ['getConfiguration', 'getLoggedInUser', 'getBaseURL']),

    // Envía la petición para el borrado del usuario de la sesión actual al servicio
    // indicado en 'baseURL'.
    // Notifica al usuario del resultado de la operación, actualizando el valor de
    // 'lastError' si fuese necesario.
    //
    // Cualquiera que sea el resultado de la operació en el servicio elimina los datos
    // de sesión en el cliente.
    delUser () {
      const baseURL = this.getBaseURL()
      const url = baseURL + '/user/delete'
      const postData = this.getLoggedInUser()

      let type = 'positive'
      let msg = this.$t('off.deluser')

      this.$q.loading.show()
      this.$axios.post(url, postData)
        .then(response => {
          if (response.data.status === 1) {
            type = 'possitive'
            msg = this.$t('off.deluser')
          } else {
            type = 'negative'
            msg = `${this.$t('off.errors.deluser')} : ${response.data.status_verbose}`
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
    },

    // Envía la petición para cerrar la sesión de usuario actual al servicio
    // indicado en 'baseURL'.
    // Notifica al usuario del resultado de la operación, actualizando el valor de
    // 'lastError' si fuese necesario.
    //
    // Cualquiera que sea el resultado de la operació en el servicio elimina los datos
    // de sesión en el cliente.
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
            msg = `${this.$t('off.errors.loggedout')} : ${response.data.status_verbose}`
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

  // - resource:
  // - user: objeto con la configuración de usuario (incluidos datos de sesión)
  props: ['resource', 'user']
}
</script>
