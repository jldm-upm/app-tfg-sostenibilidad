<template>
  <q-page>
    <div
      v-if="listProducts && listProducts.length > 0">
      <q-list
        bordered separator
        v-for="(producto, index) in listProducts"
        :key="index"
        >
        <q-item
          clickable
          v-ripple
          @click="setProduct(producto)"
          :active="activeProduct === producto"
          >
          <product-header
            :producto="producto"
            />
        </q-item>
      </q-list>
    </div>
    <div
      v-else>
      <q-icon
        name="cancel"
        color="red"
        size="300px"
        class="empty-list absolute-center">
        <q-tooltip content-class="bg-white text-primary">{{ $t('lisProducts.empty') }}</q-tooltip>
      </q-icon>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageList',

  data () {
    return {

    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setActiveProduct']),
    ...mapGetters('appStatus', ['getListProducts', 'getActiveProduct']),

    // almacenar el nuevo valor para activeProduct
    // navegar a la página que muestra la información del producto
    setProduct (p) {
      this.$q.loading.show()
      this.setActiveProduct(p)

      this.$router.push('/product')
        .catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            this.setLastError(error)
          }
        })

      this.$q.loading.hide()
    }
  },

  computed: {
    // devolver el valor de listProducts almacenado
    listProducts () {
      const lp = this.getListProducts() || []
      return lp
    },
    // devolver el valor de activeProduct almacenado
    activeProduct () {
      return this.getActiveProduct()
    }
  },

  components: {
    'product-header': require('src/components/Product/ProductHeader.vue').default
  }

}
</script>

<style>
.empty-list {
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
}
</style>
