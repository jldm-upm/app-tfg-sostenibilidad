<template>
  <q-btn
    rounded
    dense
    size="md"
    icon="directions_car"
    >
    {{ carbono100g }}
    <q-tooltip>{{ $t('product.carbono100g') }}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'AnalisisCarbono',

  computed: {
    carbono100g () {
      return this.producto.nutriments['carbon-footprint-from-known-ingredients_100g']
    }
  },

  data () {
    return {

    }
  },

  props: ['producto']
}
</script>
