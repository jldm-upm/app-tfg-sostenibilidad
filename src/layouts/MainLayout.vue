<template>
  <q-layout
    view="hHh lpR fFf">
    <q-header
      class="bg-primary text-white">

      <main-toolbar />

      <main-search />

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
      leftDrawer: false
    }
  },

  components: {
    'main-search': require('src/components/MainSearch.vue').default,
    'main-toolbar': require('src/components/MainToolbar.vue').default
  }

}
</script>

<style>

</style>
