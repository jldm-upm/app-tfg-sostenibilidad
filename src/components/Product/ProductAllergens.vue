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
        :label="traducirIngrediente(al)"
        />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { traducirTax } from '../../assets/js/traducir_tax.js'

export default {
  name: 'ProductAllergens',

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientes']),

    // traducir ingrediente
    traducirIngrediente (valor) {
      const tax = this.getTaxIngredientes()
      return traducirTax(valor, tax, this.$i18n.locale)
    }
  },

  // - alergenos: array de alergenos a mostrar
  props: ['alergenos']
}
</script>
