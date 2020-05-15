<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-primary text-white">
      <div>
        <q-btn
          dense
          flat
          round
          icon="menu"
          size="lg"
          @click="leftDrawer = !leftDrawer"/>
        <div
          class="text-h5 q-ma-sm text-white">
          {{ $t('mainlayout.title') }}
        </div>
        <q-toolbar
          class="bg-primary q-pa-sm">
          <q-space />
          <q-input
            class="col"
            type="search"
            outlined
            clearable
            v-model="codigo"
            clear-icon="close"
            bg-color="white"
            label-color="secondary"
            @keyup.enter="buscar"
            :label="$t('mainlayout.search')"
            >
          </q-input>
            <q-btn
              round
              size="lg"
              icon="camera"
              @click.stop="camara"
              />
        </q-toolbar>
      </div>
      <q-img
        src="statics/ml_h_bg.jpg"
        class="header-image absolute-top">
        <div class="absolute-top text-right text-md">
          "Bud" by Aram Vartian is licensed under CC PDM 1.0
        </div>
      </q-img>
    </q-header>

    <q-drawer
      elevated
      overlay
      v-model="leftDrawer"
      side="left"
      behavior="mobile"
      >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {

  },

  data () {
    return {
      codigo: '',
      leftDrawer: false
    }
  },

  methods: {
    buscar () {
      if (this.codigo.length > 0) {
        console.log(`Buscando ${this.codigo}`)
        this.codigo = ''
      }
    },
    camara () {

    }
  }
}
</script>

<style lang="scss">
.header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(90%);
}
</style>
