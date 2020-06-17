<template>
  <q-item-section>
    <q-item-label lines="1" class="text-primary">
      <span class="text-weight-medium">{{ producto.code }}<q-tooltip content-class="bg-white text-primary">{{ producto.code }}</q-tooltip></span>
    </q-item-label>
    <q-item-label lines="1">
      <span class="text-h6 text-bold">
        {{ producto.generic_name }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.generic_name }}</q-tooltip>
      </span>
    </q-item-label>

    <q-item-label caption lines="3">
      <span class="text-grey-8">
        {{ producto.product_name }}
      </span>
      <q-tooltip content-class="bg-white text-primary">{{ producto.product_name }}</q-tooltip>
    </q-item-label>
    <q-item-label
      lines="1"
      class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
      <span>
        <q-rating
          v-model="sustainability_lvl"
          readonly
          size="xs"
          color="secondary"
          ></q-rating>
      </span>
    </q-item-label>
  </q-item-section>
</template>

<script>
export default {
  name: 'ProductHeader',

  computed: {
    sustainability_lvl () {
      let res = 3
      if (this.producto.sustainability) {
        if (this.producto.sustainability.sustainability_level) {
          res = this.producto.sustainability.sustainability_level
        }
      }
      return res
    }
  },

  props: ['producto']
}
</script>
