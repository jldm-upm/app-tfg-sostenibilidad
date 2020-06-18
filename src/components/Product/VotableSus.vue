<template>
  <q-item>
    {{ JSON.stringify (val) }}
    <slot/>
    {{ nombre }}
    <q-toggle
      :value=val
      @input="evtVotar"
      />
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
      alert(`${url}: ${this.usuario}`)
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
    usuario () {
      return this.getLoggedInUser()
    }
  },

  props: ['codigo', 'sus', 'val', 'nombre']
}
</script>

<style>

</style>
