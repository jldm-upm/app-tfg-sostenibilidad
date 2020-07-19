<template>
  <div>
    <a-ingrediente
      class="q-ma-xs"
      v-for="analisis in producto.ingredients_analysis_tags"
      :key="analisis"

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

  // - producto: Producto del que mostrar el análisis de ingredientes
  props: ['producto']
}
</script>
