<template>
  <q-item
    clickable>
    <q-item-section avatar right>
      <img
        :alt="$t('product.image')"
        :src="producto.image_front_thumb_url"
        />
    </q-item-section>

    <q-item-section top class="col-6">
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ producto.code }}<q-tooltip content-class="bg-white text-primary">{{ producto.code }}</q-tooltip></span>
        <span class="text-grey-8">{{ producto.generic_name }}<q-tooltip content-class="bg-white text-primary">{{ producto.generic_name }}</q-tooltip></span>
      </q-item-label>
      <q-item-label caption lines="1">
        {{ producto.product_name }}
        <q-tooltip content-class="bg-white text-primary">{{ producto.product_name }}</q-tooltip>
      </q-item-label>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <span><q-rating v-model="producto.sustainability.sustainability_level" readonly></q-rating></span>
      </q-item-label>
      <q-item-label>
        {{ producto.origins }}
      </q-item-label>
      <div class="row q-gutter-xs">
        <div
          class="recuadro q-pa-xs"
          v-for="analisis in producto.ingredients_analysis_tags"
          :key="analisis">
          {{ traducir(analisis,"ingredientsAnalysis") }}
        </div>
      </div>
    </q-item-section>
    <q-item-section
      side>
      <q-btn
        @click.stop="dialogoSostenibilidad = true"
        dense
        round>
        <q-avatar
          size="36px">
          <img
            src="./SDG_Wheel_Transparent_WEB_mini.png" />
        </q-avatar>
        <q-tooltip content-class="bg-white text-primary">{{ $t('product.add_sustainability') }}</q-tooltip>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductResumen',

  data () {
    return {
      dialogoSostenibilidad: false
    }
  },

  computed: {
    lang () {
      return this.$i18n.locale
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxIngredientsAnalysis']),

    traducir (valor, taxomomia) {
      // console.log(`traducir(${valor},${taxonomia})`)
      let res = valor
      switch (taxomomia) {
        case 'ingredientsAnalysis':
          res = this.getTaxIngredientsAnalysis()[valor].name[this.lang]
          break
      }
      console.log(`traducir.res=${res}`)
      return res
    }
  },

  props: ['producto']
}
</script>

<style>
.recuadro {
    background-color: gray;
    border-radius: 25px;
}
</style>
