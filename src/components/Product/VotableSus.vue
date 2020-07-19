<template>
  <q-item clickable v-ripple
          :class="{ bg_voto_neutro: val === null || val === undefined, bg_voto_positivo : val, bg_voto_negativo : !val && val !== null && val !== undefined }"
          @click="evtVotar(!val)">
    <q-item-section side>
      <q-badge color="green">{{ producto_true }}</q-badge>
      <q-badge color="grey">{{ producto_null }}</q-badge>
      <q-badge color="red">{{ producto_false }}</q-badge>
      <slot />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ nombre }}</q-item-label>
      <q-item-label caption lines="3">{{ description }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-toggle
        :disabled="!getLoggedInUser()"
        indeterminate-value=true
        :value=val
        toggle-order='tf'
        @input="evtVotar"
        />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VotableSus',

  data () {
    return {

    }
  },

  methods: {
    ...mapGetters('appStatus', ['getBaseURL', 'getLoggedInUser']),
    ...mapActions('appStatus', ['setLastError', 'votar', 'setActiveProduct']),

    // Cambia el valor de votación de un producto, llama al servicio para actualizar la votación.
    evtVotar (newVal, evt) {
      if (this.getLoggedInUser()) {
        this.actualizarEnServidor(this.codigo, this.sus, newVal)
      } else {
        this.$q.notify({
          type: 'warning',
          icon: 'warning',
          message: this.$t('vote.notlogged')
        })
      }
    },

    // Actualiza la información de votaciones del producto en el servicio indicado por 'baseURL'
    // Notifica del resultado de la operación en el servidor y actualiza 'lastError' si fuese necesario.
    //
    // Parámetros:
    //  - codigo: codigo del producto a votar
    //  - sustainability: símbolo de la sostenibilidad a votar
    //  - valor: nuevo valor para el producto y la categoría de sostenibilidad
    async actualizarEnServidor (codigo, sustainability, valor) {
      const baseURL = this.getBaseURL()
      const url = `${baseURL}/user/vote/${codigo}/${sustainability}/${valor}`

      let type = ''
      let icon = ''
      let message = ''
      this.$q.loading.show()
      const session = { un: this.usuario.un, id: this.usuario.id, ts: this.usuario.ts, old_value: this.val }

      try {
        const response = await this.$axios.post(url, session)
        console.log(`RESPONSE: ${JSON.stringify(response.data)}`)

        this.$q.loading.hide()
        if (response.data.status === 1) {
          // this.votarSostenibilidad({ code: this.producto.code, sus: this.sus, val: valor })
          type = 'possitive'
          icon = 'cloud_done'
          message = this.$t('off.voted')

          this.votar({ code: this.codigo, sus: this.sus, value: valor })

          this.setActiveProduct(response.data.prod)
        } else {
          type = 'negative'
          icon = 'cloud_done'
          message = `${this.$t('off.errors.voted')} ${response.data.status_verbose}`
        }
      } catch (error) {
        console.log(`ERROR: ${JSON.stringify(error)}`)
        type = 'negative'
        message = this.$t('off.errors.serverProblem')
        console.log(JSON.stringify(error))
        this.setLastError(error)

        if (error.response) {
          message = `${this.$t('off.errors.serverProblem')} Http.Status: ${error.response.status}`
        } else if (error.request) {
          message = `${this.$t('off.errors.serverProblem')} Http: ${JSON.stringify(error)}`
        } else {
          message = `${this.$t('off.errors.serverProblem')} ${this.$t('off.errors.notResponse')}`
        }
      } finally {
        this.$q.loading.hide()

        this.$q.notify({
          type: type,
          icon: icon,
          message: message
        })
      }
    }
  },

  computed: {
    // devuelve el númer de votaciones positivas que ha recibido el producto
    producto_true () {
      return this.votg.true || 0
    },
    // devuelve el númer de votaciones neutras que ha recibido el producto
    producto_null () {
      return this.votg.null || 0
    },
    // devuelve el númer de votaciones negativas que ha recibido el producto
    producto_false () {
      return this.votg.false || 0
    },
    // Devuelve el objeto con la información de usuario de sesión almacenada
    usuario () {
      return this.getLoggedInUser()
    }
  },

  // - codigo: código del producto del que mostrar/actualizar la información de sostenibilidad
  // - sus: símbolo de la categoría de sostenibilidad a mostrar/actualizar
  // - nombre: nombre internacionalizado de la categoría de sostenibilidad a mostar/actualizar
  // - description: descripción internacionalizada de la categoría de sostenibilidad a mostar/actualizar
  // - votg: objecto con las votaciones recibidas por el producto: {true:..., false:...,null:...}
  props: ['codigo', 'sus', 'val', 'nombre', 'description', 'votg']
}
</script>

<style>
.bg_voto_positivo {
    background-image: linear-gradient(to right, #9ced6a, rgba(156,237,106,0.7));
}
.bg_voto_negativo {
    background-image: linear-gradient(to right, #fc9583, rgba(252,149,131,0.7));
}
.bg_voto_neutro {

}
</style>
