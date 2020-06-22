import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import appStatus from './app_status'
import taxonomias from './taxonomias'

import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const persistAllowedMutations = [
  'appStatus/updateConfiguration', 'appStatus/setHistorySize', 'appStatus/setBaseURL',
  'appStatus/setPageSize', 'appStatus/setLanguage', 'appStatus/setUserSustainability', 'appStatus/setVot'
]

const vuexLocalStorage = new VuexPersist({
  key: 'tfgs2020', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  filter: mutation => {
    // console.log(mutation)
    return persistAllowedMutations.includes(mutation.type)
  }
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      appStatus: appStatus,
      taxonomias: taxonomias
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    plugins: [vuexLocalStorage.plugin]
  })

  return Store
}
