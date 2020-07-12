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
  },

  created () {
    // al iniciar el MainLayout poner el local del lenguage almacenado
    this.$i18n.locale = this.$store.state.appStatus.configuration.language
  }

}
</script>

<style>

</style>
