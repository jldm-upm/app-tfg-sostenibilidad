<template>
  <q-list
    padding
    bordered
    class="rounded-borders">

    <q-item>
      <q-item-section>
        <product-resumen
          :product=product
          >
        </product-resumen>
      </q-item-section>

    </q-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="perm_identity"
      :label="$t('product.ingredients')"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          <q-list>
            <q-item
              dense
              v-for="ingredient in product.ingredients"
              :key="ingredient.id"
              >
              {{ ingredient.text }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="signal_wifi_off"
      :label="$t('product.categories')"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          <q-list>
            <q-item
              dense
              v-for="category in product.categories_tags"
              :key="category"
              >
              {{ St(category) }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      icon="drafts"
      label="Drafts"
      header-class="text-purple"
      group="more_info"
      >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </q-list>
</template>

<script>
export default {
  components: {
    'product-resumen': require('src/components/ProductResumen.vue').default
  },

  props: ['product']
}
</script>
