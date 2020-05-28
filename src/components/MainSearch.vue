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
            @click.stop="buscar"
            />
        </template>
      </q-input>
      <q-btn
        outlined
        shadow
        size="lg"
        icon="photo_camera"
        to="/capture"
        v-ripple:secondary
        />
    </q-toolbar>
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
    }
  }
}
</script>
