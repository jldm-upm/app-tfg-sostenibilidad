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
      <q-list>
        <q-item>
          <q-item-section>
            <product-resumen
              :producto="null"
              />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageHistory',

  data () {
    return {

    }
  },

  computed: {
    history () {
      return this.getHistory()
    },
    activeProduct: {
      get: () => {
        return this.getActiveProduct()
      },
      set: (newValue) => {
        return this.setActiveProduct(newValue)
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
