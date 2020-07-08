<template>
  <div>
    <div>
      <MglMap
        :accessToken='accessToken'
        :mapStyle.sync='mapStyle'
        :center='coordinates'
        :minZoom='2'
        :zoom="zoomDst"
        @load="onMapLoad"
        >
        <!-- <MglGeocoderControl -->
        <!--   :mapboxgl="mapboxgl" -->
        <!--   :accessToken="accessToken" -->
        <!--   :input.sync="defaultInput" -->
        <!--   @results="handleSearch" -->
        <!--   ></MglGeocoderControl> -->
        <MglAttributionControl ></MglAttributionControl>
        <MglScaleControl ></MglScaleControl>

        <div
          v-if="posiciones && posiciones.length > 0">
          <MglMarker
            v-for="coord in posiciones"
            :key="coord"
            :coordinates="coord" color="blue">
          </MglMarker>
        </div>
      </MglMap>
    </div>
    <q-btn
      :label="$t('map.center')"
      @click="setCentrarPosicionEnMapa()">
    </q-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import mapboxgl from 'mapbox-gl'
import { MglMap, MglMarker, MglAttributionControl, MglScaleControl } from 'vue-mapbox'
// import MglGeocoderControl from 'vue-mapbox-geocoder'
import { MAPBOX_TOKEN } from '../assets/js/PRIVATE.js'
import { buscarMapbox, getPosition } from '../assets/js/mapas.js'

export default {
  created () {
    // We need to set mapbox-gl library here in order to use it in template
    this.elmap = mapboxgl
  },
  mounted () {
    // se ha accedido a la página: alguién quiere buscar localizaciones
    const localizaciones = this.getLocalizaciones() // un array
    this.setCentrarPosicionEnMapa()
    if (localizaciones && localizaciones.length > 0) {
      this.posiciones = buscarMapbox(localizaciones.join('+'))
    }
  },
  components: {
    MglMap,

    MglAttributionControl,
    MglScaleControl,

    MglMarker

    // MglGeocoderControl
  },

  data () {
    return {
      posiciones: null,
      accessToken: MAPBOX_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      defaultInput: 'Madrid',
      zoomDst: 1
    }
  },

  computed: {
    coordinates: {
      get () {
        return this.getCoordenadas()
      },
      set (val) {
        this.setCoordenadas(val)
      }
    }
  },

  methods: {
    onMapLoad ({ map }) {
      this.mapboxMap = map
    },

    ...mapGetters('appStatus', ['getCoordenadas', 'getCountry', 'getLanguage', 'getLocalizaciones']),
    ...mapActions('appStatus', ['setCoordenadas']),
    ...mapGetters('taxonomias', ['getCountries']),

    async setCentrarPosicionEnMapa () {
      this.$q.loading.show()
      let res = null

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 'infinity'
      }

      if (navigator.geolocation) {
        try {
          const resServidor = await getPosition(options)
          res = [resServidor.coors.latitude, resServidor.coors.longitude]
          this.zoomDst = 13
        } catch (error) {
          // console.log(error)
        }
      }

      if (res === null) {
        this.zoomDst = 10
        const countries = this.getCountries()
        const locCountry = countries[this.getCountry()].name[this.getLanguage()]
        const resServidor = await buscarMapbox('country: ' + locCountry)

        if (resServidor && resServidor.length > 0) {
          res = resServidor[0]
        }
      }

      this.coordinates = res

      // if (res) {
      //   this.setCoordenadas(res)
      //   const optionsFlyTo = { center: res, zoom: this.zoomDst, bearing: 0 }
      //   await this.elmap.flyTo(optionsFlyTo)
      // }
      this.$q.loading.hide()
    },

    handleSearch (event) {
      console.log(event)
    }
  }
}
</script>

<style>
@import: 'statics/mapbox-gl.css'
</style>
