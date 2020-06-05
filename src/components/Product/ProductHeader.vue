<template>
<q-item-section>
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
    </q-item-section>
</template>

<script>
export default {
  props: ['producto']
}
</script>
