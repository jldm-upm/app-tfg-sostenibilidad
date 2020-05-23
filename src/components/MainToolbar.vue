<template>
  <div class="q-pa-sm">
    <q-btn-group
      spread
      outlined>
      <q-btn
        dense
        class="text-lg text-bold"
        to="/">/</q-btn>
      <q-btn
        dense
        icon="tune"
        size="md"
        to="/conf"
        />
      <q-btn
        dense
        icon="list"
        size="md"
        to="/list"
        />
      <q-btn
        dense
        icon="emoji_food_beverage"
        size="md"
        to="/product"
        />
      <q-btn
        dense
        icon="person"
        size="md"
        to="/login"
        />
      <q-btn
        dense
        icon="help"
        size="md"
        to="/help"
        />
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
