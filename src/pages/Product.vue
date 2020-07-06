<template>
  <q-page>
    <product-extended
      :producto="getActiveProductOrEmpty"
      />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { productoVacio } from '../assets/js/producto_vacio.js'

export default {
  name: 'PageProduct',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct'])
  },

  computed: {
    getActiveProductOrEmpty () {
      return this.getActiveProduct() || productoVacio()
    }
  },

  components: {
    'product-extended': require('src/components/Product/ProductExtended.vue').default
  }
}
</script>

<style type="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    height: 160px;
    margin-bottom: 10px;
}
</style>
