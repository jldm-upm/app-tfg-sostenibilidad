<template>
  <q-page class="column">
    <div
      id="basicinfo"
      >
      <div
        class="rounded-borders shadow-2 text-white text-center text-h6 bg-secondary q-pa-xs"
        >
        {{ $t('product.name') }}
      </div>
      <div class="text-overline text-orange-9">{{ product.generic_name }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ product.product_name}}</div>
      <div class="text-caption text-grey">
        {{ product.brands }}
      </div>
    </div>

    <div
      id="imagen"
      >
      <div
        class="rounded-borders shadow-2 text-white text-center text-h6 bg-secondary q-pa-xs"
        >
        {{ $t('product.image') }}
      </div>
      <q-img
        style="height: 140px; max-width: 150px"
        spinner-color="secondary"
        :src="product.image_front_url"
        />
    </div>

    <div
      id="ingredientes"
      >
      <div
        class="rounded-borders shadow-2 text-white text-center text-h6 bg-secondary q-pa-xs"
        >
        {{ $t('product.name') }}
      </div>
      <div class="text-overline text-orange-9">{{ product.generic_name }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ product.product_name}}</div>
      <div class="text-caption text-grey">
        {{ product.brands }}
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'

export default {
  name: 'PageProduct',

  data () {
    return {
      expanded: [true, true, true, true],
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },

  computed: {
    product () {
      return this.getProduct()
    }
  },

  methods: {
    ...mapActions('appStatus', ['setProduct']),
    ...mapGetters('appStatus', ['getBaseURL', 'getProduct']),
    imageShowed () {
      // selected_images
      return 0
    }
  }
}
</script>

<style type="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    height: 160px;
    margin-bottom: 10px;
}
</style>
