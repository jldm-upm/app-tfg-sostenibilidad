<template>
  <q-card>
    <q-card-section>
      <slot/>
    </q-card-section>
    <q-card-section>
      <q-btn
        disabled
        v-for="al in alergenos"
        :key="al"
        :label="traducir(al, 'ingredients')"
        />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from './traducir_tax.js'

export default {
  name: 'ProductAllergens',

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    traducir (valor, taxomomia) {
      console.log(`traducir: ${JSON.stringify(valor)}`)
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  props: ['alergenos']
}
</script>
