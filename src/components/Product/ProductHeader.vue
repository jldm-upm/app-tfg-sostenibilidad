<template>
  <q-list>
    <q-item>
      <q-item-section avatar>
        <q-img
          v-if="imagenProducto"
          spinner-color="white"
          :src="imagenProducto"
          style="max-height: 140px; width: 60px"/>
        <q-avatar
          v-else
          size="md"
          color="primary"
          text-color="white">
          P
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-regular text-secondary">{{ producto.code }}<q-tooltip content-class="bg-white text-primary">{{ producto.code }}</q-tooltip></span>
        </q-item-label>
        <q-item-label caption lines="3">
          <span class="text-weight-medium text-primary">
            {{ producto.brands }}
          </span>
          <q-tooltip content-class="bg-white text-primary">{{ producto.brands }}</q-tooltip>
        </q-item-label>
        <q-item-label caption lines="3">
          <span class="text-weight-medium text-primary">
            {{ producto.product_name }}
          </span>
          <q-tooltip content-class="bg-white text-primary">{{ producto.product_name }}</q-tooltip>
        </q-item-label>
        <span class="text-grey-8">
          {{ producto.generic_name }}
          <q-tooltip content-class="bg-white text-primary">{{ producto.generic_name }}</q-tooltip>
        </span>
        <q-item-label
          lines="1"
          class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
          <product-ratings
            :producto=producto>
          </product-ratings>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { obtenerImagenes } from '../../assets/js/imagenes.js'

export default {
  name: 'ProductHeader',

  components: {
    'product-ratings': require('src/components/Product/ProductRatings.vue').default
  },

  computed: {
    // devuelve una imágen de producto
    imagenProducto () {
      if (this.useExternalService) {
        const imgs = obtenerImagenes(this.producto)
        return imgs.image_front_thumb_url || imgs.image_front_small_url || imgs.image_front_url || imgs.image_thumb_url || imgs.image_small_url || imgs.image_url
      } else {
        return ''
      }
    },
    // devolver el valor de useExternalService almacenado
    useExternalService () {
      return this.getUseOtherServices()
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getUseOtherServices']),
    ...mapGetters('taxonomias', ['getBrands'])
  },

  // - producto: Producto del que mostrar la información
  props: ['producto']
}
</script>
