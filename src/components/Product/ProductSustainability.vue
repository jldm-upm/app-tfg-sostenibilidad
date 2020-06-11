<template>
  <div>
    <slot/>
    <q-list>
      <votable-sus v-for="sus in Object.keys(sustain)"
                   :key="sus"
                   :sus=sus>
        {{ traducir(sus,'sustainability') }}
      </votable-sus>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'ProductSustainability',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxSustainability']),

    traducir (valor, taxomomia) {
      const tax = this.getTaxSustainability()
      return traducirTax(valor, tax, this.$i18n.locale)
    }

  },

  computed: {
    sustain () {
      return this.getTaxSustainability()
    }
  },

  components: {
    'votable-sus': require('src/components/Product/VotableSustain.vue').default
  }
}

</script>
