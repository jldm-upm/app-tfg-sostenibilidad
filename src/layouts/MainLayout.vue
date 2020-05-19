<template>
  <q-layout
    view="hHh lpR fFf">
    <main-toolbar></main-toolbar>
    <q-header
      class="text-white">
      <main-search></main-search>
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

  data () {
    return {
      // visibilidad panel izqdo.
      leftDrawer: false
    }
  },

  components: {
    'main-search': require('src/components/MainSearch.vue').default,
    'main-toolbar': require('src/components/MainToolbar.vue').default
  }

}
</script>

<style lang="scss">
</style>
