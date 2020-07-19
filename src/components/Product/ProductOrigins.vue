<template>
  <div>
    <div>
      <span class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        {{ $t('product.attr.origins') }}
      </span>
      <span>
        {{ producto.origins }}
      </span>
      <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
    </div>
    <div>
      <span class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        {{ $t('product.attr.manufactured') }}
      </span>
      <span>
        {{ producto.manufacturing_places }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ProductOrigins',

  // - producto: Producto del que mostrar el orígen
  props: ['producto']
}
</script>
