<template>
  <q-item tag="label"
          v-ripple
          :disabled="!usuario || !producto">
    <q-item-section>
      <q-badge floating outline align="top" color="green">{{ producto.sustainability[sus + "_true"] }}</q-badge>
      <q-badge floating outline align="bottom" color="red">{{ producto.sustainability[sus + "_false"] }}</q-badge>
      <q-item-label>
        <slot/>
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-toggle
        toggle-indeterminate
        color="blue"
        size="xl"
        v-model="valor"
        />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { traducirTax } from './traducir_tax.js'
import { productoVacio } from '../../pages/producto_vacio.js'

export default {
  name: 'VoteSustainability',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct', 'getBaseURL', 'getLoggedInUser', 'getVot', 'getVotacion']),
    ...mapGetters('taxonomias', ['getSustainability']),
    ...mapActions('appStatus', ['setLastError', 'setVot', 'votarSostenibilidad']),

    traducir (valor, taxomomia) {
      const tax = this.getSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    },

    async actualizarEnServidor (codigo, sustainability, valor) {
      const baseURL = this.getBaseURL()
      const url = `${baseURL}/user/vote/${codigo}/${sustainability}/${valor}`
      let type = ''
      let icon = ''
      let message = ''
      this.$q.loading.show()
      this.$axios.post(url, this.usuario)
        .then(response => {
          this.$q.loading.hide()
          if (response.data.status === 1) {
            this.votarSostenibilidad({ code: this.producto.code, sus: this.sus, val: valor })
            type = 'possitive'
            icon = 'cloud_done'
            message = this.$t('off.voted')
          } else {
            type = 'negative'
            icon = 'cloud_done'
            message = `${this.$t('off.errors.voted')} ${response.data.status_verbose}`
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
    }
  },

  computed: {
    producto () {
      return this.getActiveProduct() || productoVacio()
    },
    usuario () {
      return this.getLoggedInUser()
    },
    vot: {
      get () { return this.getVot() },
      set (val) { this.setVot(val) }
    },
    valor: {
      get () {
        let res = null
        if (this.usuario) {
          res = this.vot[this.sus]
        }
        return res
      },
      set (val) {
        let type = 'possitive'
        let msg = this.$t('vote.success')
        if (this.usuario) {
          const newVot = { ...this.vot }
          newVot[this.sus] = val
          this.setVot(newVot)
          this.actualizarEnServidor(this.producto.code, this.sus, val)
        } else {
          type = 'warning'
          msg = this.$t('vote.notlogged')
        }
        this.$q.notify({
          type: type,
          message: msg
        })
      }
    }
  },

  props: ['sus']
}
</script>

<style>
.recuadro_label {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
