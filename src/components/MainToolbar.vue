<template>
  <q-btn
    dense
    flat
    round
    icon="menu"
    size="lg"
    @click="leftDrawer = !leftDrawer"
    />

</template>

<script>

export default {
  data () {
    return {

    }
  },

  props: ['leftDrawer']
}
</script>
