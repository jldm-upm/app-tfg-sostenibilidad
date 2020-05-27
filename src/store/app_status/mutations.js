import Vue from 'vue'
/*
export function someMutation (state) {
}
*/
export function setActiveProduct (state, product) {
  state.activeProduct = product
  if (state.history && (state.history.length === state.configuration.cacheSizeProducts)) {
    Vue.delete(state.history[0])
  }
  Vue.set(state.history, state.history.push(product))
}

export function setError (state, error) {
  state.lastError = error
}

export function updateConfiguration (state, payload) {
  Object.assign(state.configuration, payload)
}

export function setLoggedInUser (state, user) {
  state.loggedInUser = user
}

export function setConfiguration (state, conf) {
  const confRes = { ...state.configuration, ...conf }
  console.log(JSON.stringify(confRes))
  state.configuration = confRes
}
