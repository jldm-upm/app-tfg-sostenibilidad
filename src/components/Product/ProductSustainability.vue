<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductSustainability',

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct'])
  },

  computed: {
    producto () {
      return this.getActiveProduct
    }
  }
}

</script>
