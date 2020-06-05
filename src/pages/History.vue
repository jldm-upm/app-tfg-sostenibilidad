<template>
  <q-page>
    <div
      v-if="history.length > 0">
      <q-list
        v-for="(producto, index) in history"
        :key="index"
        >
        <product-resumen
          :active="activeProduct === producto"
          :producto="producto"
          />
      </q-list>
    </div>
    <div
      v-else>
      <q-icon
        name="cancel"
        color="red"
        size="300px"
        class="empty-list absolute-center">
        <q-tooltip content-class="bg-white text-primary">{{ $t('history.empty') }}</q-tooltip>
      </q-icon>
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

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setActiveProduct']),
    ...mapGetters('appStatus', ['getHistory', 'getActiveProduct'])
  },

  computed: {
    history () {
      const hist = this.getHistory()
      return hist
    },
    activeProduct () {
      return this.getActiveProduct()
    }
  },

  components: {
    'product-resumen': require('src/components/Product/ProductResumen.vue').default
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
