<template>
  <q-page>
    <q-tabs
      v-model="tab"
      class="text-teal"
      >
      <q-tab name="login"
             icon="person"
             :label="$t('login.login')">
      </q-tab>
      <q-tab
        name="new"
        icon="person_add"
        :label="$t('login.new')">
      </q-tab>
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      class="shadow-2 rounded-borders"
      >
      <q-tab-panel
        name="login">
        <login-tab></login-tab>
      </q-tab-panel>

      <q-tab-panel
        name="new">

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

  computed: {
    ...mapGetters('appStatus', ['getLoggedInUser'])
  },

  components: {
    'login-tab': require('src/components/Login/Login.vue').default
  }
}
</script>
