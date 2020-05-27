/*
export function someAction (context) {
}
*/
export function setActiveProduct ({ commit }, product) {
  commit('setActiveProduct', product)
}

export function setLastError ({ commit }, error) {
  commit('setError', error)
}

export function updateConfiguration ({ commit }, payload) {
  commit('updateConfiguration', payload)
}

export function setLoggedInUser ({ commit, state }, serverResponse) {
  console.log(`setLoggedInUser: ${JSON.stringify(serverResponse)}`)
  if (serverResponse) {
    const resConf = {}
    Object.assign(resConf, state.configuration, serverResponse.conf)
    commit('setLoggedInUser', serverResponse.session)
    commit('setConfiguration', resConf)
  } else {
    commit('setLoggedInUser', null)
  }
}
