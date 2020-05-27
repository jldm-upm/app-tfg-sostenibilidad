<template>
  <div class="q-pa-sm">
    <q-btn-group
      spread
      outlined>
      <q-btn
        dense
        class="text-lg text-bold"
        to="/">
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.main') }}</q-tooltip>
        /
      </q-btn>
      <q-btn
        dense
        icon="list"
        size="md"
        to="/list"
        >
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.list') }}</q-tooltip>
      </q-btn>
      <q-btn
        dense
        icon="history"
        size="md"
        to="/history"
        >
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.history') }}</q-tooltip>
      </q-btn>
      <q-btn
        dense
        icon="emoji_food_beverage"
        size="md"
        to="/product"
        >
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.product') }}</q-tooltip>
      </q-btn>
      <q-btn
        dense
        icon="person"
        size="md"
        to="/login"
        >
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.user') }}</q-tooltip>
      </q-btn>
      <q-btn
        dense
        icon="help"
        size="md"
        to="/help"
        >
        <q-tooltip content-class="bg-white text-primary">{{ $t('toolbar.help') }}</q-tooltip>
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>
