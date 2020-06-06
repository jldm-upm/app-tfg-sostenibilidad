<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductNutriments',

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
