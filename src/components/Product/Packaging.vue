<template>
  <q-btn-group rounded>
    <q-btn
      dense
      rounded
      :label="quantity">
      <q-tooltip>{{ $t('product.quantity') }}</q-tooltip>
    </q-btn>
    <q-btn
      dense
      rounded
      :label="packaging[0]">
      <q-tooltip>{{ $t('product.package_shape') }}</q-tooltip>
    </q-btn>
    <q-btn
      dense
      rounded
      :label="packaging[1]">
      <q-tooltip>{{ $t('product.package_material') }}</q-tooltip>
    </q-btn>
  </q-btn-group>
</template>

<script>
export default {
  name: 'Packaging',

  computed: {
    // devolver el valor de 'packaging_tags' del producto
    packaging () {
      return this.producto.packaging_tags || []
    },
    // devolver el valor de 'quantity' del producto
    quantity () {
      return this.producto.quantity || '-'
    }
  },

  data () {
    return {

    }
  },

  // - producto: Producto del que se mostrará la información de empaquetado
  props: ['producto']
}
</script>
