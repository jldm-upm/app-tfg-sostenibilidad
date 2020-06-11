<template>
  <q-btn-group rounded>
    <q-icon rounded name="widgets" size="md" />
    <q-btn rounded :label="quantity">
      <q-tooltip>{{ $t('product.quantity') }}</q-tooltip>
    </q-btn>
    <q-btn rounded :label="packaging[0]">
      <q-tooltip>{{ $t('product.package_shape') }}</q-tooltip>
    </q-btn>
    <q-btn rounded :label="packaging[1]">
      <q-tooltip>{{ $t('product.package_material') }}</q-tooltip>
    </q-btn>
  </q-btn-group>
</template>

<script>
export default {
  name: 'Packaging',

  computed: {
    packaging () {
      return this.producto.packaging_tags
    },
    quantity () {
      return this.producto.quantity || '-'
    }
  },

  data () {
    return {

    }
  },

  props: ['producto']
}
</script>
