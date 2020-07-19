<template>
  <div>
    {{ carbono100g }}
    <q-tooltip>{{ $t('product.carbono100g') }}</q-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AnalisisCarbono',

  computed: {
    // devuelve la huella de carbono por 100g producidos del producto, utiliza el campo 'carbon-footprint_100g' o 'carbon_footfrint_percent_of_know_ingredients' según disponibilidad
    carbono100g () {
      return (this.producto['carbon-footprint_100g'] || this.producto.nutriments.carbon_footprint_percent_of_known_ingredients)
    }
  },

  data () {
    return {

    }
  },

  // Producto del que calcular la huella de carbono
  props: ['producto']
}
</script>
