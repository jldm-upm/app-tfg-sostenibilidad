<template>
  <div class="full">
    <q-btn :label="$t('map.search')"
           @click="busquedaCentradaEnMapa">
    </q-btn>
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
      posicionUsuario: [0, 0],

      markers: []
    }
  },

  // al montarse:
  //  inicia el mapa de Mapbox
  async mounted () {
    this.createMap()
    this.$q.loading.show()
    let zoom = 5
    try {
      this.posicionUsuario = await obtenerPosicion(this.getPais())
      zoom = 14
    } catch (posErr) {
      this.posicionUsuario = posErr
      zoom = 5
      this.$q.notify({ type: 'warning', message: this.$t('map.noLocationService') })
    } finally {
      this.$q.loading.hide()
    }

    await this.map.setZoom(zoom)
    // this.map.flyTo({
    //   center: this.posicionUsuario,
    //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
    // })
    await this.map.setCenter(this.posicionUsuario)

    await this.busquedaCentradaEnMapa()
  },

  methods: {
    ...mapGetters('appStatus', ['getCountry', 'getLanguage', 'getMapInterest']),
    ...mapGetters('taxonomias', ['getCountries']),

    async busquedaCentradaEnMapa () {
      for (const mark in this.markers) {
        this.markers[mark].remove()
      }

      // añadir los puntos de interés
      const puntosInteres = await buscarMapbox((this.getMapInterest()).join(','), this.map.getCenter())
      for (const punto in puntosInteres) {
        const marker = new mapboxgl.Marker().setLngLat(puntosInteres[punto])
        this.markers.push(marker)
      }

      for (const mark in this.markers) {
        this.markers[mark].addTo(this.map)
      }
    },

    // devolver la internacionalización del valor de country almacenado
    getPais () {
      const pais = this.getCountry()
      const paises = this.getCountries()
      return traducirTax(pais, paises, this.getLanguage())
    },

    // truco: al cargar el mapa llamar a re-dimensionar para que ocupe el espacio
    onMapLoaded (event) {
      // ocupar toda el espacio disponible
      this.map.resize()
    },

    // Crear mapa
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
      // const marker = new mapboxgl.Marker().setLngLat([-74.0073, 40.7124])
      // marker.addTo(this.map)
    }
  }
}
</script>

<style>
.mapboxgl-canvas-container {

    height: 100vh;

}
</style>
