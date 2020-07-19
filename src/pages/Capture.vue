<template>
    <div class="row items-center"
         style="height: 100vh"
         key="escaneo">
      <div class="col text-center q-pa-sm">
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]">

          <q-btn color="primary"
                 icon="camera_alt"
                 :label="$t('capture.startScan')"
                 class="full-width"
                 size="lg"
                 @click="iniciarEscaneo()"
                 v-show="cameraStatus === 0"/>
        </q-page-sticky>
        <div id="scan"
             v-show="cameraStatus === 1">
        </div>
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]">
          <q-btn
            icon="cancel"
            color="negative"
            label="Cancelar"
            v-show="cameraStatus === 1"
            @click="onStop" />
        </q-page-sticky>
      </div>
    </div>

</template>

<script>
// import Quagga from 'quagga'
// import Quagga from '@ericblade/quagga2'
const Quagga = require('@ericblade/quagga2').default

import { mapActions } from 'vuex'

window.hasCameraPermission = null
window.scannedCode = null

export default {
  name: 'PageCapture',

  data () {
    return {
      dialog: false,
      cameraStatus: 0
    }
  },

  computed: {
    // devuelve un booleno indicando si el cliente se ejecuta como
    // una aplicación cordova
    enCordova () {
      return this.$q.platform.is.cordova
    }
  },

  methods: {
    ...mapActions('appStatus', ['setCodigo', 'setLastError']),

    // comunica el resultado de escaneo usando el plugin para cordova.
    // 1. almacena el código detectado en 'codigo'
    // 2. emite el evento global 'evtBuscar'
    escaneoCordova (result) {
      this.setCodigo(result.text)
      this.$root.$emit('evtBuscar', result.text)
    },

    // comunica un error en el escaneo usando el plugin para cordova
    // 1. muestra una alerta
    // 2. almacena el error en 'lastError'
    escaneoCordovaError (error) {
      alert(JSON.stringify(error))
      this.setLastError(error)
    },

    // inicia la captura de código de barras usando el plugin para cordova
    //
    // 1. comprueba los permisos de cámara para Android
    // 2. inicia la captura
    async capturarCordova () {
      // capturar con cordova
      const permissions = cordova.plugins.permissions

      await permissions.checkPermission(permissions.CAMERA, (res) => {
        if (!res.hasPermission) {
          permissions.requestPermission(
            permissions.CAMERA,
            p => { window.hasCameraPermission = true },
            e => { window.hasCameraPermission = false })
        } else {
          window.hasCameraPermission = true
        }
      })

      if (window.hasCameraPermission) {
        await cordova.plugins.barcodeScanner.scan(
          this.escaneoCordova,
          this.escaneoCordovaError,
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            // prompt: $t('capture.startScan'), // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
            // orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
          })
      }
    },

    // configura la captura de código de barras usando la librería Quagga
    configurarQuagga () {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scan')
        },
        frequency: 10,
        decoder: {
          readers: [
            'ean_reader',
            'code_128_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
            '2of5_reader',
            'code_93_reader'
          ],
          multiple: false
        }
      }, (err) => {
        if (err) {
          this.setLastError(err)
        }
      })
      Quagga.onDetected(this.onDetected)
    },

    // inicia la captura de código de barras usando el plugin para cordova
    capturarQuagga () {
      Quagga.start()
    },

    // inicia el escaneo de un código de barras.
    // - Si la plataforma es cordova utilizará el plugin: phonegap-plugin-barcodescanner
    // - Si no es cordova utilizará la librería Quagga
    iniciarEscaneo () {
      if (this.enCordova) {
        this.capturarCordova()
      } else {
        this.cameraStatus = 1
        this.capturarQuagga()
      }
    },

    // comunica el resultado de escaneo usando la librería Quagga
    // 1. almacena el código detectado en 'codigo'
    // 2. Detiene la captura
    // 3. emite el evento global 'evtBuscar'
    onDetected (data) {
      this.setCodigo(data.codeResult.code)
      this.cameraStatus = 0
      this.onStop()
      this.$root.$emit('evtBuscar', data.codeResult.code)
    },

    // Detiene la captura con la librería Quagga.
    // Navega a la página que muestra la información del producto
    onStop () {
      Quagga.stop()
      this.cameraStatus = 0

      this.$router.push('/product')
        .catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            this.setLastError(error)
          }
        })
    }
  },

  // al montarse:
  // configura Quagga
  mounted () {
    if (!(this.enCordova)) {
      console.log('mounted (quagga)')
      this.configurarQuagga()
    }

    // this.iniciarEscaneo()
  },

  // al destruirse:
  // limpiar
  beforeDestroy () {
    this.onStop()
    window.scannedCode = null
    window.hasCameraPermission = null
  }
}
</script>

<style>
video {
    width: 100%;
    height: auto;
}
/* #scan { */
/*   border-right: 15vh solid orange; */
/*   border-left: 15vh solid orange; */
/*   height: 70vh */
/* } */
/* .verticalLine { */
/*   border-left: thick solid #ff0000; */
/* } */
</style>
