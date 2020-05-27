<template>
  <q-page>
    <q-tabs
      v-model="tab"
      class="text-teal"
      >
      <q-tab name="login"
             icon="person"
             >
      </q-tab>
      <q-tab
        name="new"
        icon="person_add"
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
          v-if="getLoggedInUser()"
          resource="/user/logout"
          :user="getLoggedInUser()">
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

  methods: {
    ...mapGetters('appStatus', ['getLoggedInUser'])
  },

  components: {
    'login-tab': require('src/components/User/Login.vue').default,
    'login-new': require('src/components/User/New.vue').default,
    'user-tab': require('src/components/User/User.vue').default
  }
}
</script>
