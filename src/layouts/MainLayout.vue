<template>
  <q-layout
    view="hHh lpR fFf">
    <q-header
      class="bg-primary text-white">

      <main-toolbar />

      <main-search />

    </q-header>

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
