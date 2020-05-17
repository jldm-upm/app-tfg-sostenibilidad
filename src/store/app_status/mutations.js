import Vue from 'vue'
/*
export function someMutation (state) {
}
*/
export function setProduct (state, product) {
  const index = state.cacheIndex
  const conf = state.configuration
  console.log(conf)
  // cache!
  if ((state.product) && (conf.cacheSizeProducs > 0)) {
    Vue.set(state.cacheProduct, index, state.product)
    // state.cacheIndex = (index + 1) % conf.cacheSizeProducts
    updateConfiguration(state, { cacheIndex: (index + 1) % conf.cacheSizeProducts })
  }
  state.product = product
}

export function setError (state, error) {
  state.lastError = error
}

export function updateConfiguration (state, payload) {
  Object.assign(state.configuration, payload)
}
