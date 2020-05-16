import Vue from 'vue'
/*
export function someMutation (state) {
}
*/
export function setProduct (state, product) {
  // cache!
  if (state.product) {
    Vue.set(state.cacheProduct, state.cacheIndex, state.product)
    state.cacheIndex = (state.cacheIndex + 1) % state.configuracion.productCacheSize
  }
  state.product = product
}

export function setError (state, error) {
  state.lastError = error
}

export function updateConfiguration (state, payload) {
  Object.assign(state.configuration, payload)
}
