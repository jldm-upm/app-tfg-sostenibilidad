<template>
  <q-item
    tag="label"
    v-ripple
    :disabled="!usuario || !producto">
    <q-item-section side>
      <q-badge color="green">{{ producto_true }}</q-badge>
      <q-badge color="grey">{{ producto_true }}</q-badge>
      <q-badge color="red">{{ producto_false }}</q-badge>
    </q-item-section>
    <q-item-section>
      <div class="text-h5">
        <slot/>
      </div>
    </q-item-section>
    <q-item-section>
      <q-toggle
        toggle-indeterminate
        color="primary"
        size="xl"
        v-model="valor"
        >
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
      let res = await this.$axios.post(url, this.usuario)
        .then(response => {
          this.$q.loading.hide()
          if (response.data.status === 1) {
            // this.votarSostenibilidad({ code: this.producto.code, sus: this.sus, val: valor })
            type = 'possitive'
            icon = 'cloud_done'
            message = this.$t('off.voted')

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
    producto () {
      return this.getActiveProduct() || productoVacio()
    },
    producto_true () {
      return this.producto.sustainability[this.sus + '_true'] || 0
    },
    producto_undefined () {
      return this.producto.sustainability[this.sus + '_undefined'] || 0
    },
    producto_false () {
      return this.producto.sustainability[this.sus + '_false'] || 0
    },
    usuario () {
      return this.getLoggedInUser()
    },
    vot () {
      return this.getVot()
    },
    valor: {
      get () {
        let res = '-'
        if (this.producto && this.vot) {
          if (this.vot[this.producto.code]) {
            res = this.vot[this.producto.code][this.sus]
          }
        }
        console.log(`valor.res=${res}`)
        return res
      },
      async set (val) {
        if (this.producto && this.vot) {
          // let type = 'possitive'
          // let msg = this.$t('vote.success')

          if (this.producto.code.includes('xxxxxxxxx')) {
            // producto "vacio" (un mock)
            return null
          }

          const resVote = await this.actualizarEnServidor(this.producto.code, this.sus, val)
          if (resVote) {
            if (resVote.data.status === 1) {
              this.votarSostenibilidad({ code: this.producto.code, sus: this.sus, val: val })
              // this.setVot(resVote.data.vot)
            }
          }
        }
        return val
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
