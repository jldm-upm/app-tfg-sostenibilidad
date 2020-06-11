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
        class="q-pa-sm"
        :producto=producto>
      </analisis-ingredientes>
    </div>

    <div class="row">
      <analisis-carbono
        v-if="producto.nutriments['carbon-footprint-from-known-ingredients_100g']"
        class="q-pa-sm"
        :producto=producto >
      </analisis-carbono>
      <packaging
        v-if="producto.packaging_tags"
        class="q-pa-sm"
        :producto=producto>
      </packaging>
  </div>
  <div class="column">
    <labels
      class="q-pa-sm"
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
    labels: require('src/components/Product/Labels.vue').default,
    'analisis-carbono': require('src/components/Product/AnalisisCarbono.vue').default,
    packaging: require('src/components/Product/Packaging.vue').default
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
