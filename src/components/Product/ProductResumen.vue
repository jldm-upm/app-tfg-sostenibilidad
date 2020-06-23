<template>
  <div>
    <q-card-section horizontal>
      <q-card-section>
        <q-badge
          floating>
          {{ producto.complete ? $t('product.complete') : $t('product.notcomplete') }}
        </q-badge>
        <product-header
          :producto=producto>
        </product-header>
      </q-card-section>
      <q-card-section class="row">
        <q-btn
          size="lg"
          disabled="!!producto"
          class="justify-around items-center text-white bg-primary"
          icon="map" />
      </q-card-section>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: 'ProductResumen',

  data () {
    return {
      splitterModel: 50, // 50%
      dialogoSostenibilidad: false
    }
  },

  components: {
    'product-header': require('src/components/Product/ProductHeader.vue').default
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
