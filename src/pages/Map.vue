<template>
  <div id='#app'>
    <mgl-map
      :accessToken='accessToken'
      :mapStyle.sync='mapStyle'
      >
      <mgl-navigation-control position='top-right'/>
      <mgl-geolocate-control position='top-right' />
    </mgl-map>
  </div>
</template>

<script>
import { MglMap, MglNavigationControl, MglGeolocateControl } from 'vue-mapbox'
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../statics/PRIVATE.js'

export default {
  components: {
    'mgl-map': MglMap,
    'mgl-navigation-control': MglNavigationControl,
    'mgl-geolocate-control': MglGeolocateControl
  },
  data () {
    return {
      accessToken: MAPBOX_TOKEN,
      mapStyle: MAPBOX_STYLE
    }
  }
}
</script>
