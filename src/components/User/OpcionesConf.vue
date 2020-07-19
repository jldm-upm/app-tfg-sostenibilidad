<template>
  <q-list
    class="column items-center">
    <q-item>
      <q-item-section>
        <q-select
          style="min-width: 150px; max-width: 200px"
          square
          outlined
          v-model="lang"
          :options="langOptions"
          :label="this.$t('configuration.language')"
          emit-value
          map-options
          options-dense
          />
        <q-item-label caption lines="3">{{ $t('configuration.language_hint') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model="baseURL"
        filled
        type="url"
        placeholder="https://world.openfoodfacts.org"
        :label="$t('configuration.baseURL')"
        :hint="$t('configuration.baseURL_hint')"
        />
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model.number="historySize"
        filled
        type="number"
        :label="$t('configuration.historySize')"
        :hint="$t('configuration.historySize_hint')"
        />
    </q-item>
    <q-item>
      <q-input
        debounce="1000"
        v-model.number="pageSize"
        filled
        type="number"
        :label="$t('configuration.pageSize')"
        :hint="$t('configuration.pageSize_hint')"
        />
    </q-item>
    <q-item>
      <q-item-section>
        <country-select>
        </country-select>
        <q-item-label caption lines="3">{{ $t('configuration.country_hint') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-toggle
          v-model="serviciosExternos"
          :label="$t('configuration.useOtherServices')" />
        <q-item-label caption lines="3">{{ $t('configuration.useOtherServices_hint') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <fieldset>
        <q-list>
          <legend>{{ $t('configuration.sustainability') }}</legend>
          <cuantificacion-sostenibilidad
            class="q-py-lg"
            v-for="k in Object.keys(sustainTax)"
            :key=k
            :sus=k
            />
        </q-list>
      </fieldset>
    </q-item>
  </q-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OpcionesConf',

  data () {
    return {
      langOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
    }
  },

  computed: {
    baseURL: {
      get () {
        // devolver el valor de baseURL almacenado
        return this.$store.state.appStatus.configuration.baseURL
      },
      set (val) {
        // almacenar el nuevo valor para baseURL
        this.$store.commit('appStatus/setBaseURL', val)
      }
    },
    historySize: {
      get () {
        // devolver el valor de historySize almacenado
        return this.$store.state.appStatus.configuration.historySize
      },
        set (val) {
        // almacenar el nuevo valor para historySize
        this.$store.commit('appStatus/setHistorySize', val)
      }
    },
    pageSize: {
      get () {
        // devolver el valor de pageSize almacenado
        return this.$store.state.appStatus.configuration.pageSize
      },
      set (val) {
        // almacenar el nuevo valor para pageSize
        this.$store.commit('appStatus/setPageSize', val)
      }
    },
    lang: {
      get () {
        // devolver el valor de lang almacenado
        return this.$i18n.locale
      },
      set (val) {
        // almacenar el nuevo valor para lang
        this.$i18n.locale = val
      }
    },
    serviciosExternos: {
      get () {
        // devolver el valor de useOtherServices almacenado
        return this.getUseOtherServices()
      },
      set (val) {
        // almacenar el nuevo valor para useOtherServices
        this.setUseOtherServices(val)
      }
    },
    sustainTax () {
      return this.getTaxSustainability()
    }
  },

  watch: {
    lang: function (lang) {
     // al cambiar el valor de lang, se cambia el locale del entorno y
     // se almacena el nuevo valor
      this.$i18n.locale = lang
      this.$store.commit('appStatus/setLanguage', lang)
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getUseOtherServices']),
    ...mapActions('appStatus', ['setUseOtherServices']),
    ...mapGetters('taxonomias', ['getTaxSustainability']),

    // Al cambiar el valor en el componente actualizar el almacenado
    inputChange (val, evt) {
      this.setUseOtherServices(val)
    }
  },

  components: {
    'cuantificacion-sostenibilidad': require('src/components/User/CUserSostenibilidad.vue').default,
    'country-select': require('src/components/User/CountrySelect.vue').default
  },

  // - resource:
  // - user: Configuración de usuario
  props: ['resource', 'user']
}
</script>

<style>
.q-input {
    min-width: 150px;
    max-width: 200px;
}
</style>
