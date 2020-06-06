<template>
  <div>
    <label-tag
      class="q-ma-xs"
      v-for="label in producto.labels_tags"
      :key="label"
      disabled
      :label=label
      >
    </label-tag>
  </div>
</template>

<script>
export default {
  name: 'Labels',

  components: {
    'label-tag': require('src/components/Product/LabelTag.vue').default
  },

  props: ['producto']
}
</script>
