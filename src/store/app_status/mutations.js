/*
export function someMutation (state) {
}
*/
export function setProduct (state, product) {
  state.product = product
}

export function setError (state, error) {
  state.lastError = error
}

export function updateConfiguration (state, payload) {
  Object.assign(state.configuration, payload)
}
