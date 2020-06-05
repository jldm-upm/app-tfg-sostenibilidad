<template>
  <q-item>
    <q-badge
      class="text-weight-medium"
      floating>
      {{ producto.complete ? $t('product.complete') : $t('product.notcomplete') }}
    </q-badge>
    <q-item-section top>
      <q-item-label lines="1" class="text-primary">
        <span class="text-weight-medium">{{ producto.code }}<q-tooltip content-class="bg-white text-primary">{{ producto.code }}</q-tooltip></span>
      </q-item-label>
      <q-item-label lines="1">
        <span class="text-grey-8">{{ producto.generic_name }}<q-tooltip content-class="bg-white text-primary">{{ producto.generic_name }}</q-tooltip></span>
      </q-item-label>
      <q-item-label caption lines="1">
        {{ producto.product_name }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.product_name }}</q-tooltip>
      </q-item-label>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <span><q-rating
                v-model="producto.sustainability.sustainability_level"
                readonly
                size="xs"
                color="secondary"
                ></q-rating></span>
      </q-item-label>
      <q-item-section bottom>
        <analisis-ingredientes
          v-for="analisis in producto.ingredients_analysis_tags"
          :key="analisis"
          :ai=analisis
          >
        </analisis-ingredientes>
        <label-tag
          v-for="label in producto.labels_tags"
          :key="label"
          :label=label
          >
        </label-tag>
      </q-item-section>
    </q-item-section>
  </q-item>

</template>

<script>
export default {
  name: 'ProductResumen',

  data () {
    return {
      dialogoSostenibilidad: false
    }
  },

  components: {
    'analisis-ingredientes': require('src/components/Product/AnalisisIngredientes.vue').default,
    'label-tag': require('src/components/Product/LabelTag.vue').default
  },

  props: ['producto']
}
</script>
