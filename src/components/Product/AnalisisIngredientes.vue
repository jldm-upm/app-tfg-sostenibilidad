<template>
  <div>
    <a-ingrediente
      v-for="analisis in producto.ingredients_analysis_tags"
      :key="analisis"

      disabled
      :ai=analisis>
    </a-ingrediente>
  </div>
</template>

<script>
export default {
  name: 'AnalisisIngredientes',

  components: {
    'a-ingrediente': require('src/components/Product/AIngrediente.vue').default
  },

  props: ['producto']
}
</script>
