<template>
  <q-list>
    <q-item>
      <analisis-ingredientes
        :producto=producto>
      </analisis-ingredientes>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="flight" />
      </q-item-section>
      <q-item-section>
        <product-origins
          :producto=producto />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="directions_car" />
      </q-item-section>
      <q-item-section>
        <analisis-carbono
          :producto=producto >
        </analisis-carbono>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="widgets" />
      </q-item-section>
      <q-item-section>
        <packaging
          class="row items-stretch justify-evenly"
          :producto=producto>
        </packaging>
      </q-item-section>
    </q-item>
    <q-item>
      <labels
        class="q-pa-sm"
        :producto=producto>
      </labels>
    </q-item>
  </q-list>
</template>

<script>
export default {
  components: {
    'product-origins': require('src/components/Product/ProductOrigins.vue').default,
    'analisis-ingredientes': require('src/components/Product/AnalisisIngredientes.vue').default,
    labels: require('src/components/Product/Labels.vue').default,
    'analisis-carbono': require('src/components/Product/AnalisisCarbono.vue').default,
    packaging: require('src/components/Product/Packaging.vue').default
  },

  // - producto: Producto del que se mostrará la información
  props: ['producto']
}
</script>
