<template>
  <div
    class="q-gutter-md"
    >
    <div class="column">
      <q-btn
        clas="text-h5 text-center"
        :label="$t('configuration.configuration')"
        @click="dialog = true"
        icon="settings"
        >
        <q-tooltip
          content-class="bg-white text-primary">
          {{ $t('configuration.configuration') }}
        </q-tooltip>
      </q-btn>
    </div>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      @keyup.esc="dialog = false"
      >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">{{ $t('minimize')}}</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">{{ $t('maximize') }}</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">{{ $t('close') }}</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          v-if="user">
          <div class="text-h6">{{ $t('login.user') + ": " + user.un }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn
            v-if="user"
            icon-right="cloud_upload"
            :label="$t('login.upload')"
            @click="onSubmit">
            <q-tooltip
              content-class="bg-white text-primary">{{ $t('login.upload') }}</q-tooltip>
          </q-btn>

          <opciones-configuracion
            :resource=resource
            :user=user
            />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'Configure',

  data () {
    return {
      dialog: false,
      maximizedToggle: true
    }
  },

  components: {
    'opciones-configuracion': require('src/components/User/OpcionesConf.vue').default
  },

  props: ['resource', 'user']
}
</script>
