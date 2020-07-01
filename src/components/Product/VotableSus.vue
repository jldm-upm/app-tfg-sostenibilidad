<template>
  <q-item clickable ripple
          :class="{ bg_grey: val === null || val === undefined, bg_green : val, bg_red : !val }"
          @click="evtVotar(!val)">
    <q-item-section side>
      <q-badge color="green">{{ producto_true }}</q-badge>
      <q-badge color="grey">{{ producto_null }}</q-badge>
      <q-badge color="red">{{ producto_false }}</q-badge>
      <slot />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ nombre }}</q-item-label>
      <q-item-label caption lines="3">{{ description }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-toggle
        :disabled="!getLoggedInUser()"
        indeterminate-value=true
        :value=val
        toggle-order='tf'
        @input="evtVotar"
        />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VotableSus',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('appStatus', ['getBaseURL', 'getLoggedInUser']),
    ...mapActions('appStatus', ['setLastError', 'votar']),

    evtVotar (newVal, evt) {
      this.actualizarEnServidor(this.codigo, this.sus, newVal)
    },

    async actualizarEnServidor (codigo, sustainability, valor) {
      const baseURL = this.getBaseURL()
      const url = `${baseURL}/user/vote/${codigo}/${sustainability}/${valor}`

      let type = ''
      let icon = ''
      let message = ''
      this.$q.loading.show()
      let res = await this.$axios.post(url, this.usuario)
        .then(response => {
          this.$q.loading.hide()
          if (response.data.status === 1) {
            // this.votarSostenibilidad({ code: this.producto.code, sus: this.sus, val: valor })
            type = 'possitive'
            icon = 'cloud_done'
            message = this.$t('off.voted')

            this.votar({ code: this.codigo, sus: this.sus, value: valor })

            res = response
          } else {
            type = 'negative'
            icon = 'cloud_done'
            message = `${this.$t('off.errors.voted')} ${response.data.status_verbose}`

            res = null
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

          res = null
        })
        .then(() => {
          this.$q.loading.hide()

          this.$q.notify({
            type: type,
            icon: icon,
            message: message
          })

          return res
        })

      return res
    }
  },

  computed: {
    producto_true () {
      return this.votg.true || 0
    },
    producto_null () {
      return this.votg.null || 0
    },
    producto_false () {
      return this.votg.false || 0
    },
    usuario () {
      return this.getLoggedInUser()
    }
  },

  props: ['codigo', 'sus', 'val', 'nombre', 'description', 'votg']
}
</script>

<style>

</style>
