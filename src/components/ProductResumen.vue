<template>
  <q-card>
    <q-item>
      <q-item-section avatar top>
        <q-avatar
          square>
          <img :src="product.image_small_url || product.image_url">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-orange">
          {{ product.code }}
        </q-item-label>
        <q-item-label class="text-small text-primary">
          {{ product.generic_name }}
        </q-item-label>
        <q-item-label class="text-h6">
          {{ product.product_name }}
        </q-item-label>
        <q-item-label class="text-small">
            {{ product.brands }} - {{ product.brand_owner }} &#40;{{ product.origins }}&#41;
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
      eveniet doloribus ullam aliquid.
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'ProductResumen',

  props: ['product']
}
</script>
