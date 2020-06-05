<template>
  <div>
    <q-badge
      class="text-weight-medium"
      floating>
      {{ producto.complete ? $t('product.complete') : $t('product.notcomplete') }}
    </q-badge>
    <product-header
      :producto=producto>
    </product-header>
    <analisis-ingredientes
      v-for="analisis in producto.ingredients_analysis_tags"
      :key="analisis"
      :ai=analisis
      >
    </analisis-ingredientes>
    <label-tag
      v-for="label in producto.labels_tags"
      :key="label"

      :label=label
      >
    </label-tag>
  </div>
</template>

<script>
export default {
  name: 'ProductResumen',

  data () {
    return {
      dialogoSostenibilidad: false
    }
  },

  components: {
    'product-header': require('src/components/Product/ProductHeader.vue').default,
    'analisis-ingredientes': require('src/components/Product/AnalisisIngredientes.vue').default,
    'label-tag': require('src/components/Product/LabelTag.vue').default
  },

  props: ['producto']
}
</script>

<style>
.clsai {

}
.clslabel {

}
</style>
