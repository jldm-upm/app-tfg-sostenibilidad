<template>
  <q-page class="column">
    <product-extended
      :product="getActiveProduct"
      />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageProduct',

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('appStatus', ['getActiveProduct'])
  },

  components: {
    'product-extended': require('src/components/ProductExtended.vue').default
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
