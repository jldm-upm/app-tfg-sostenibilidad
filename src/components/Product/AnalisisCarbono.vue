<template>
  <q-btn
    rounded
    dense
    size="sm"
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
      return (this.producto['carbon-footprint_100g'] || this.producto.nutriments.carbon_footprint_percent_of_known_ingredients)
    }
  },

  data () {
    return {

    }
  },

  props: ['producto']
}
</script>
