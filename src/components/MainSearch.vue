<template>
        <q-toolbar
          class="bg-primary q-pa-sm">
          <q-space />
          <q-input
            class="col"
            type="search"
            outlined
            clearable
            v-model="codigo"
            clear-icon="close"
            bg-color="white"
            label-color="secondary"
            :label="$t('mainlayout.search')"
            @keyup.enter="buscar"
            >
            <template v-slot:prepend>
              <q-btn
                rounded
                flat
                size="lg"
                icon="search"
                to="/capture"
                @click="buscar"
                />
            </template>
          </q-input>
          <q-btn
            class="q-ml-lg"
            rounded
            shadow
            size="lg"
            icon="photo_camera"
            to="/capture"
            v-ripple:secondary
            />
        </q-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

function unixTimestamp () {
  return Math.floor(Date.now() / 1000)
}

export default {
  data () {
    return {
      codigo: ''
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setProduct']),
    ...mapGetters('appStatus', ['getBaseURL']),

    buscar () {
      const baseURL = this.getBaseURL()
      if (this.codigo.length > 0) {
        const url = `${baseURL}/product/${this.codigo}.json`
        console.log(url)
        this.$q.loading.show()
        this.$axios.get(url)
          .then(response => {
            this.$q.loading.hide()
            if (response.data.status === 1) {
              const product = response.data.product
              product.cache_app_t = unixTimestamp()
              this.setProduct(product)
              this.$q.notify({
                type: 'positive',
                message: `${this.$t('off.product.found')} ${product.product_name}`
              })
              this.$router.push('/product')
                .catch(error => {
                  if (error.name !== 'NavigationDuplicated') {
                    this.setLastError(error)
                    throw error
                  }
                })
            } else {
              this.setLastError(response.data)
              this.$q.notify({
                type: 'negative',
                message: `Product ${this.$t('off.product.notFound')}!`
              })
            }
          })
          .catch(error => {
            this.$q.loading.hide()

            const negType = 'negative'
            let msg = this.$t('off.errors.serverProblem')

            this.setLastError(error)
            console.log(error)
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
        this.codigo = ''
      }
    }
  }
}
</script>
