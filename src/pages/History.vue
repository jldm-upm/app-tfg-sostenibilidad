<template>
  <q-page>
    <q-list v-for="(producto, index) in history"
            :key="index">
      <q-item
        v-if="producto">
        <q-item-section>
          <product-resumen
            :producto="producto"
            />
        </q-item-section>
      </q-item>
    </q-list>
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
    }
  },

  methods: {
    ...mapActions('appStatus', ['setLastError', 'setActiveProduct']),
    ...mapGetters('appStatus', ['getHistory'])
  },

  components: {
    'product-resumen': require('src/components/Product/ProductResumen.vue').default
  }

}
</script>
