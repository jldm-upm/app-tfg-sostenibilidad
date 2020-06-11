<template>
  <q-item tag="label"
          v-ripple
          :disabled="!usuario || !producto">
    <q-item-section>
      <div>

      </div>
      <div>
        <q-badge align="bottom" color="red">2</q-badge>
      </div>
      <div class="text-h5">
        <slot/>
      </div>
    </q-item-section>
    <q-item-section avatar>
      <q-toggle
        toggle-indeterminate
        color="primary"
        size="xl"
        v-model="valor"
        >
        <q-badge align="top" color="green">10</q-badge>
      </q-toggle>
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
      console.log(`vot: ${this.getActiveProduct()}`)
      return this.getActiveProduct() || productoVacio()
    },
    producto_true () {
      return this.producto.sustainability[this.sus + '_true']
    },
    producto_undefined () {
      return this.producto.sustainability[this.sus + '_undefined']
    },
    producto_false () {
      return this.producto.sustainability[this.sus + '_false']
    },
    usuario () {
      console.log(`usuario: ${this.getLoggedInUser()}`)
      return this.getLoggedInUser()
    },
    vot () {
      console.log(`vot: ${JSON.stringify(this.getVot())}`)
      return this.getVot()
    },
    valor () {
      let res = '-'
      if (this.producto && this.vot) {
        if (this.vot[this.producto.code]) {
          res = this.vot[this.producto.code][this.sus]
        }
      }
      console.log(`valor: ${res}`)
      return res
    }
    // let type = 'possitive'
    // let msg = this.$t('vote.success')
    // if (this.usuario) {
    //   const newVot = { ...this.vot }
    //   newVot[this.sus] = val
    //   this.setVot(newVot)
    //   this.actualizarEnServidor(this.producto.code, this.sus, val)
    // } else {
    //   type = 'warning'
    //   msg = this.$t('vote.notlogged')
    // }
    // this.$q.notify({
    //   type: type,
    //   message: msg
    // })
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
