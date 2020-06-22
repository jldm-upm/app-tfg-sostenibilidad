<template>
  <q-item-section>
    <q-item-label lines="1" class="text-right">
      <span class="text-weight-regular text-primary">{{ producto.code }}<q-tooltip content-class="bg-white text-primary">{{ producto.code }}</q-tooltip></span>
    </q-item-label>
    <q-item-label lines="1">
      <span class="text-weight-medium">
        {{ producto.generic_name }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.generic_name }}</q-tooltip>
      </span>
    </q-item-label>

    <q-item-label caption lines="3">
      <span class="text-grey-8">
        {{ producto.product_name }}
      </span>
      <q-tooltip content-class="bg-white text-primary">{{ producto.product_name }}</q-tooltip>
    </q-item-label>
    <q-item-label
      lines="1"
      class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
      <product-ratings
        :producto=producto>
      </product-ratings>
    </q-item-label>
  </q-item-section>
</template>

<script>
export default {
  name: 'ProductHeader',

  components: {
    'product-ratings': require('src/components/Product/ProductRatings.vue').default
  },

  props: ['producto']
}
</script>
