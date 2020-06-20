<template>
  <div class="column">
    <q-badge
      floating>
      {{ producto.complete ? $t('product.complete') : $t('product.notcomplete') }}
    </q-badge>
    <product-header
      :producto=producto>
    </product-header>
    <div class="row items-stretch justify-evenly">
      <analisis-carbono
        :producto=producto >
      </analisis-carbono>

      <analisis-ingredientes
        :producto=producto>
      </analisis-ingredientes>
    </div>

    <div class="row items-stretch justify-evenly">
      <packaging
        v-if="producto.packaging_tags"
        class="row items-stretch justify-evenly"
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
