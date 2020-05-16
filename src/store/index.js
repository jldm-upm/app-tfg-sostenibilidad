import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import appStatus from './app_status'
// TODO: usar VuexPersistent: https://alligator.io/vuejs/vuex-persist-state/

Vue.use(Vuex)

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
      appStatus
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
