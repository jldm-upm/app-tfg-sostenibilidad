<template>
  <div>
    <div>
      <slot>{{ $t('product.ingredients') }}</slot>
    </div>
    <div class="column">
      <q-list
        bordered separator
        v-if="producto.sustainability"
        >
        <votable-sus
          v-for="k in Object.keys(sustain_tax)"
          :key=k
          :codigo=codigo
          :sus=k
          :val="valor(k)"
          :nombre="traducir(k,'sustainability')"
          :description="sustain_tax[k].description[getLanguage()]"
          :votg="votaciones(k)"
          >
          <q-tooltip content-class="bg-white text-primary">{{ sustain_tax[k].description[getLanguage()] }}</q-tooltip>
        </votable-sus>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../traducir_tax.js'
import { productoVacio } from '../../pages/producto_vacio.js'

export default {
  name: 'ProductSustainability',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxSustainability']),
    ...mapGetters('appStatus', ['getActiveProduct', 'getVot', 'getLanguage']),

    valor (key) {
      if (!(this.votaciones_usuario)) {
        return null
      }
      if (!(this.votaciones_usuario[this.codigo])) {
        return null
      }
      const s = this.votaciones_usuario[this.codigo][key]
      if (typeof (s) === 'boolean') {
        return s
      } else if (s === 'true') {
        return true
      } else if (s === 'false') {
        return false
      } else {
        return null
      }
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
    },

    votaciones (key) {
      const res = {}
      if (this.producto) {
        res.true = this.producto.sustainability[key + '_true']
        res.null = this.producto.sustainability[key + '_null']
        res.false = this.producto.sustainability[key + '_false']
      }

      return res
    },

    traducir (valor, taxomomia) {
      const tax = this.getTaxSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  computed: {
    sustain_tax () {
      return this.getTaxSustainability()
    },
    producto () {
      return this.getActiveProduct() || productoVacio()
    },
    codigo () {
      return this.producto.code
    },
    votaciones_usuario () {
      return this.getVot()
    },
    votaciones_usuario_producto () {
      // console.log(`${JSON.stringify(this.votaciones_usuario)} ${this.codigo}`)
      const res = this.votaciones_usuario[this.codigo]
      if (!res) {
        return {}
      } else {
        return res
      }
    }
  },

  components: {
    'votable-sus': require('src/components/Product/VotableSus.vue').default
  }
}
</script>
