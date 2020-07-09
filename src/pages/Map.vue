<template>
  <div class="full">
    <div id='map'></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
require('../../node_modules/mapbox-gl/dist/mapbox-gl.css')
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../assets/js/PRIVATE.js'

import { traducirTax } from '../assets/js/traducir_tax.js'

import { buscarMapbox, obtenerPosicion } from '../assets/js/mapas.js'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      posicionUsuario: [0, 0]
    }
  },

  async mounted () {
    this.createMap()
    let zoom = 5
    try {
      this.posicionUsuario = await obtenerPosicion('spain')
      zoom = 14
    } catch (posErr) {
      this.posicionUsuario = posErr
      zoom = 5
    }
    this.map.setZoom(zoom)
    this.map.flyTo({
      center: this.posicionUsuario,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    })
  },

  methods: {
    ...mapGetters('appStatus', ['getCountry', 'getLanguage']),
    ...mapGetters('taxonomias', ['getCountries']),

    getPais () {
      const pais = this.getCountry()
      const paises = this.getCountries()
      return traducirTax(pais, paises, this.getLanguage())
    },

    onMapLoaded (event) {
      this.map.resize()

      buscarMapbox('country: ' + this.getPais())
        .then(function (arrayPos) {
          alert('buscarThen ' + JSON.stringify(arrayPos))
          this.posicionUsuario = arrayPos[0]
        })
        .catch(function (error) {
          alert('buscarCatch ' + JSON.stringify(error))
        })
    },

    createMap: function () {
      mapboxgl.accessToken = MAPBOX_TOKEN

      // init the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: MAPBOX_STYLE,
        minzoom: 1.3,
        center: this.posicionUsuario,
        zoom: 12
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
