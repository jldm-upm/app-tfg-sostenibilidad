<template>
  <q-card>
    <q-item>
      <q-item-section avatar top>
        <q-avatar
          square>
          <q-img
            v-if="product"
            :src="product.image_small_url || product.image_url"
            spinner-color="white"
            />
          <q-icon
            v-else
            name="block"
            />
        </q-avatar>
      </q-item-section>

      <q-item-section
        v-if="product">
        <q-item-label class="text-orange">
          {{ product.code }}
        </q-item-label>
        <q-item-label class="text-small text-primary">
          {{ product.generic_name }}
        </q-item-label>
        <q-item-label class="text-bold">
          {{ product.product_name }}
        </q-item-label>
        <q-item-label class="text-small">
          &#x01F69A; {{ $t('product.origin', { brand: product.brands, owner: product.brand_owner, origin: product.origins}) }}
        </q-item-label>
      </q-item-section>

      <q-item-section
        v-else>
        <q-item-label class="text-orange">
          {{  new Array(12).join('_') }}
        </q-item-label>
        <q-item-label class="text-small text-primary">
          {{  new Array(23).join('_') }}
        </q-item-label>
        <q-item-label class="text-bold">
          {{  new Array(14).join('_') }}
        </q-item-label>
        <q-item-label class="text-small">
          {{  new Array(25).join('_') }}
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
