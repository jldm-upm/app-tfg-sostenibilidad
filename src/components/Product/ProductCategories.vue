<template>
  <div>
    {{ $t('product.categories') }}
    <q-tree
      :nodes="categories_tree"
      node-key="label"
      no-connectors>
      {{ producto.categories_hierarchy }}
    </q-tree>
    <q-tooltip content-class="bg-white text-primary">{{ $t('producto.categories') }}</q-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCategories',

  computed: {
    categories_tree () {
      return []
    }
  },

  methods: {
    ...mapGetters('taxonomias', ['getTaxCategories'])
  },

  data () {
    return {

    }
  },

  props: ['producto']
}
</script>
