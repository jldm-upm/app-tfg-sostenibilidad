<template>
  <div class="full">
    <div id='map'></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
require('../../node_modules/mapbox-gl/dist/mapbox-gl.css')
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../assets/js/PRIVATE.js'

export default {
  data () {
    return {}
  },
  mounted () {
    this.createMap()
  },
  methods: {
    onMapLoaded (event) {
      this.map.resize()
    },

    createMap: function () {
      mapboxgl.accessToken = MAPBOX_TOKEN

      // init the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: MAPBOX_STYLE,
        minzoom: 1.3,
        center: [-74.0073, 40.7124], // Manhattan
        zoom: 16
      })

      this.map.on('load', this.onMaploaded)

      this.map.addControl(new mapboxgl.NavigationControl())
      const marker = new mapboxgl.Marker().setLngLat([-74.0073, 40.7124])
      marker.addTo(this.map)
    }
  }
}
</script>

<style>
.mapboxgl-canvas-container {

    height: 100vh;

}
</style>
