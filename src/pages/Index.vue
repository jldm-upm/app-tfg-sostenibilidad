<template>
  <q-page>

     <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Welcome!, Bienvenido!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ $t('welcome') }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      showDialog: true
    }
  }
}
</script>

<style type="scss">
.bg_image: {
    z-index: -1;
}
</style>
