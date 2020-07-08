<template>
  <div>
    <div id='map'></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../assets/js/PRIVATE.js'
console.dir(mapboxgl)

export default {
  data () {
    return {}
  },
  mounted () {
    this.createMap()
  },
  methods: {
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

      this.map.addControl(new mapboxgl.NavigationControl())
      const marker = new mapboxgl.Marker().setLngLat([-74.0073, 40.7124])
      marker.addTo(this.map)
    }
  }
}
</script>
