<template>
  <div>
    <slot>{{ $t('product.ingredients') }}</slot>
    <div>
      <div>
        <product-allergens :alergenos=product.allergens_tags>
          <div class="text-h6 text-primary">{{ $t('product.allergens') }}</div>
        </product-allergens>
      </div>
      <div>
        <product-additives :aditivos=product.additives_tags>
          <div class="text-h6 text-primary">{{ $t('product.additives') }}</div>
        </product-additives>
      </div>
      <q-item>
        <ingredients-table><div class="text-h6 text-primary">{{ $t('product.ingredients') }}</div></ingredients-table>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { productoVacio } from '../../assets/js/producto_vacio.js'

export default {
  name: 'ProductIngredients',

  methods: {
    ...mapGetters('appStatus', ['getActiveProduct'])
  },

  computed: {
    product () {
      return this.getActiveProduct() || productoVacio()
    }
  },

  components: {
    'product-allergens': require('src/components/Product/ProductAllergens.vue').default,
    'product-additives': require('src/components/Product/ProductAdditives.vue').default,
    'ingredients-table': require('src/components/Product/IngredientsTable.vue').default
  }
}
</script>
