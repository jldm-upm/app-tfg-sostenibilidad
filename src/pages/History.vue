<template>
  <q-page>
    <div
      v-if="history.length > 0">
      <q-list
        v-for="(producto, index) in history"
        :key="index"
        >
        <q-item
          @click.stop="activeProduct = producto"
          :active="producto.code === activeProduct.code">
          <q-item-section>
            <product-resumen
              :producto="producto"
              />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div
      v-else>
      <q-icon name="clear"
              color="red"
              size="600px"
              class="absolute-center">
        <q-tooltip content-class="bg-white text-primary">{{ $t('history.empty') }}</q-tooltip>
      </q-icon>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { productoVacio } from './producto_vacio.js'

export default {
  name: 'PageHistory',

  data () {
    return {

    }
  },

  computed: {
    history () {
      const hist = this.getHistory()
      return hist
    },
    activeProduct: {
      get: () => {
        return this.getActiveProduct() || productoVacio()
      },
      set: (newValue) => {
        this.setActiveProduct(newValue)
      }
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setActiveProduct']),
    ...mapGetters('appStatus', ['getHistory', 'getActiveProduct']),

    elegir () {
      this.setActiveProduct(this.history[0])
    }
  },

  components: {
    'product-resumen': require('src/components/Product/ProductResumen.vue').default
  }

}
</script>
