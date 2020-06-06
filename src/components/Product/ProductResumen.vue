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
    <div class="column">
    <analisis-ingredientes
      :producto=producto>
    </analisis-ingredientes>
    </div>
    <div class="column">
    <labels
      :producto=producto>
    </labels>
    </div>
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
    labels: require('src/components/Product/Labels.vue').default
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
