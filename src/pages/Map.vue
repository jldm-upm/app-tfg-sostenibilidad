<template>
  <MglMap></MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap } from 'vue-mapbox'

const ACCESS_TOKEN = ''
const MAP_STYLE = ''

export default {
  components: {
    MglMap
  },

  data () {
    return {
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE // your map style
    }
  },

  created () {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox
  }
}
</script>

<style>
<style>
#map {
    width: 400px;
    height: 250px;
}
</style>
