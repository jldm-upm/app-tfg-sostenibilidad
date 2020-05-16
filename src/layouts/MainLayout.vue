<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-secondary text-white">
      <div>
        <q-btn
          dense
          flat
          round
          icon="menu"
          size="lg"
          @click="leftDrawer = !leftDrawer"/>
        <div
          class="text-h5 q-ma-sm text-white">
          {{ $t('mainlayout.title') }}
        </div>
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
      </div>
      <q-img
        src=""
        class="header-image">
        <div class="absolute-top text-right text-md">

        </div>
      </q-img>
    </q-header>

    <q-drawer
      elevated
      overlay
      v-model="leftDrawer"
      side="left"
      behavior="mobile"
      >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'MainLayout',

  data () {
    return {
      codigo: '',
      // visibilidad panel izqdo.
      leftDrawer: false
    }
  },

  methods: {
    ...mapActions('appStatus', ['setError', 'setProduct']),
    ...mapGetters('appStatus', ['getBaseURL']),

    buscar () {
      const baseURL = this.getBaseURL()
      if (this.codigo.length > 0) {
        console.log(`Buscando ${this.codigo} en ${baseURL}`)
        this.$q.loading.show()
        axios.get(`${baseURL}/product/${this.codigo}.json`)
          .then(response => {
            this.$q.loading.hide()
            if (response.data.status === 1) {
              this.setProduct(response.data.product)
              this.$q.notify({
                type: 'positive',
                message: `${this.$t('off.product.found')} ${response.data.product.product_name}`
              })
              this.$router.push('/product')
                .catch(error => {
                  if (error.name !== 'NavigationDuplicated') {
                    throw error
                  }
                })
            } else {
              this.setError(response.data)
              this.$q.notify({
                type: 'negative',
                message: `Product ${this.$t('off.product.not-found')}!`
              })
            }
          })
          .catch(error => {
            this.$q.loading.hide()

            const negType = 'negative'
            let msg = this.$t('off.errors.server-problem')

            this.setError(error)

            if (error.response) {
              msg = this.$t('off.errors.server-problem')(error.response.status)
            } else if (error.request) {
              msg = this.$t('off.errors.serverProblem')(error.request)
            } else {
              msg = this.$t('off.errors.server-problem')(this.$t('off.notResponse'))
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

<style lang="scss">
.header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(90%);
}
</style>
