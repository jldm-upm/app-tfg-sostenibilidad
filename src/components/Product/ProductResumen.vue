<template>
  <q-card>
    <q-item>
      <q-item-section avatar top>
        <q-avatar
          square>
          <q-img
            v-if="producto"
            :src="producto.image_small_url || producto.image_url"
            spinner-color="white"
            />
          <q-icon
            v-else
            name="block"
            />
        </q-avatar>
      </q-item-section>

      <q-item-section
        v-if="producto">
        <q-item-label class="text-orange">
          {{ producto.code }}
        </q-item-label>
        <q-item-label class="text-small text-primary">
          {{ producto.generic_name }}
        </q-item-label>
        <q-item-label class="text-bold">
          {{ producto.product_name }}
        </q-item-label>
        <q-item-label class="text-small">
          &#x01F69A; {{ $t('product.origin', { brand: producto.brands, owner: producto.brand_owner, origin: producto.origins}) }}
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

  props: ['producto']
}
</script>
