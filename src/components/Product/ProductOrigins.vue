<template>
  <div>
    <div>
      {{ $t('product.origins') }} {{ producto.origins }}
      <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
    </div>
    <div>
      {{ $t('product.manufactured') }} {{ producto.manufacturing_places }}
      <q-tooltip content-class="bg-white text-primary">{{ producto.origins }}</q-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: ['producto']
}
</script>
