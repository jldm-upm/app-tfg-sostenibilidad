<template>
  <q-page>
    <q-list v-for="(product, index) in history"
            :key="index">
      <q-item>
H
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
  }
}
</script>
