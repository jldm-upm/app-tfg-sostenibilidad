<template>
  <div>
    <q-toolbar
      class="q-pa-sm">
      <q-space />
      <q-input
        class="col"
        type="search"
        outlined
        clearable
        v-model="codigo"
        clear-icon="close"
        bg-color="white"
        label-color="primary"
        :label="$t('mainsearch.barcode')"
        placeholder="8437000378051"
        minlength=1
        @keyup.enter="buscar"
        >
        <template v-slot:append>
          <q-btn
            dense
            rounded
            flat
            icon="search"
            to="/capture"
            @click="buscar"
            />
        </template>
      </q-input>
      <q-btn
        outlined
        shadow
        size="lg"
        icon="photo_camera"
        @click="captureDialog = !captureDialog"
        v-ripple:secondary
        />
    </q-toolbar>

    <q-dialog
      v-model="captureDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">{{ $t('capture.close') }}</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

function unixTimestamp () {
  return Math.floor(Date.now() / 1000)
}

export default {
  data () {
    return {
      codigo: '',
      captureDialog: false
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setActiveProduct']),
    ...mapGetters('appStatus', ['getBaseURL']),

    buscar () {
      let type = 'positive'
      let message = `${this.$t('off.product.found')}`

      if (!(this.codigo) || (this.codigo.length === 0)) {
        type = 'negative'
        message = this.$t('off.notcode')

        return null
      }
      const baseURL = this.getBaseURL()
      const url = `${baseURL}/api/v0/product/${this.codigo}.json`
      console.log(url)

      this.$q.loading.show()
      this.$axios.get(url)
        .then((response) => {
          this.$q.loading.hide()

          if (!response) {
            type = 'negative'
            message = `${this.$t('off.errors.serverProblem')}`
            this.setLastError(response)
          } else if (response.data.status !== 1) {
            type = 'warning'
            message = `${this.$t('off.product.notfound')} ${response.data.status_verbose}`
            this.setLastError(response.data)
          } else {
            const product = response.data.product
            product.retrieved_t = unixTimestamp()

            type = 'positive'
            message = `${this.$t('off.product.found')} ${product.product_name}`

            this.setActiveProduct(product)

            this.$router.push('/product')
              .catch(error => {
                if (error.name !== 'NavigationDuplicated') {
                  this.setLastError(error)
                }
              })
          }
        })
        .catch((error) => {
          type = 'negative'
          message = `${this.$t('off.errors.serverProblem')}`
          this.setLastError(error)

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
            message: message
          })
        })

      this.codigo = ''
    },

    capturar () {

    }
  }
}
</script>
