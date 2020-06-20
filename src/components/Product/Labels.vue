<template>
  <div>
    <label-tag
      v-for="label in producto.labels_tags"
      :key="label"
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
