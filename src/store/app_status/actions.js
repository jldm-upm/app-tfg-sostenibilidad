/*
export function someAction (context) {
}
*/
export function setActiveProduct ({ commit }, product) {
  commit('setProduct', product)
}

export function setLastError ({ commit }, error) {
  commit('setError', error)
}

export function updateConfiguration ({ commit }, payload) {
  commit('updateConfiguration', payload)
}

export function setLoggedInUser ({ commit }, user) {
  if (user) {
    commit('setLoggedInUser', user.session)
    commit('setConfiguration', user.conf)
  } else {
    commit('setLoggedInUser', user) // user == null
  }
}
