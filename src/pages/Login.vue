<template>
  <div class="column">
    <user-configuration
      :user="loggedInUser"
      resource="/user/save">
    </user-configuration>

    <q-page>
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        >
        <q-tab name="login"
               icon="person"
               :label="loginTitle"
               >
        </q-tab>
        <q-tab
          :disable="!!(loggedInUser)"
          name="new"
          icon="person_add"
          :label="this.$t('login.newTitle')"
          >
        </q-tab>
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        class="shadow-2 rounded-borders"
        >
        <q-tab-panel
          name="login">
          <user-tab
            v-if="loggedInUser"
            resource="/user/logout"
            :user="loggedInUser">
          </user-tab>
          <login-tab
            v-else
            resource="/user/login">
          </login-tab>
        </q-tab-panel>

        <q-tab-panel
          name="new">
          <login-new
            resource="/user/new">
          </login-new>
        </q-tab-panel>
      </q-tab-panels>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageLogin',

  data () {
    return {
      tab: 'login'
    }
  },

  computed: {
    // devolver un título para la página de login.
    // Si el usuario ha iniciado sesión, devuelve su nombre.
    loginTitle () {
      const user = this.getLoggedInUser()
      let title = this.$t('login.loginTitle')

      if (user) {
        title = this.$t('login.confTitle')
      }

      return title
    },

    // devuelve la información de sesión del usuario
    loggedInUser () {
      return this.getLoggedInUser()
    }
  },

  methods: {
    ...mapGetters('appStatus', ['getLoggedInUser'])
  },

  components: {
    'login-tab': require('src/components/User/Login.vue').default,
    'login-new': require('src/components/User/New.vue').default,
    'user-tab': require('src/components/User/User.vue').default,
    'user-configuration': require('src/components/User/Configure.vue').default
  }
}
</script>
