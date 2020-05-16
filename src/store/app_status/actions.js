/*
export function someAction (context) {
}
*/
export function setProduct ({ commit }, product) {
  commit('setProduct', product)
}

export function setError ({ commit }, error) {
  commit('setError', error)
}
