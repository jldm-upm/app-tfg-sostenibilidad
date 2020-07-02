<template>
  <div>
    <q-card-section>
      <q-badge
        floating
        :class="{ bg_red : !isComplete, bg_green : isComplete }">
        {{ producto.complete ? $t('product.complete') : $t('product.notcomplete') }}
      </q-badge>
      <product-header
        :producto=producto>
      </product-header>
    </q-card-section>
    <q-card-actions horizontal class="justify-around q-px-md">
      <q-btn
        :disabled="!((producto.purchase_places_tags && producto.purchase_places_tags.length > 0) || (producto.stores_tags && producto.stores_tags.length > 0))"
        size="md"
        class="justify-around items-center text-white bg-primary"
        @click="showDialogLocalizations = !showDialogLocalizations"
        icon="map">
        <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">{{ $t('product.purchase') }}</q-tooltip>
      </q-btn>
    </q-card-actions>

    <q-dialog
      v-model="showDialogLocalizations"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      @keyup.esc="dialog = false"
      >
      <q-card>
        <q-bar>
          {{ $t('product.purchase') }}
          <q-space />

          <q-btn dense flat icon="minimize" @click.stop="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">{{ $t('minimize')}}</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">{{ $t('maximize') }}</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">{{ $t('close') }}</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <q-list v-if="(producto.purchase_places_tags && producto.purchase_places_tags.length > 0) || (producto.stores_tags && producto.stores_tags.length > 0)">
            <fieldset>
              <legend>{{ $t('product.attr.purchase_places') }}</legend>
              <q-item v-for="loc in producto.purchase_places_tags"
                      :key="loc">
                {{ loc }}
              </q-item>
            </fieldset>
            <fieldset>
              <legend>{{ $t('product.attr.stores') }}</legend>
              <q-item v-for="store in producto.stores_tags"
                      :key="store">
              </q-item>
            </fieldset>
          </q-list>
          <div
            v-else>
            <q-icon
              name="cancel"
              color="red"
              size="300px"
              class="empty-list">
              <q-tooltip content-class="bg-white text-primary">{{ $t('history.empty') }}</q-tooltip>
            </q-icon>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProductResumen',

  data () {
    return {
      showDialogLocalizations: false,
      maximizedToggle: true
    }
  },

  computed: {
    isComplete () {
      return this.producto.complete
    }
  },

  components: {
    'product-header': require('src/components/Product/ProductHeader.vue').default
  },

  props: ['producto']
}
</script>

<style>
.bg_red {
    background-color: red;
}
.bg_green {
    background-color: green;
}
.bg_grey {
    background-color: gray;
}
.empty-list {
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
}
</style>
