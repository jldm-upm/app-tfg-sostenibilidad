/*
export function someAction (context) {
}
*/
export function setCodigo ({ commit }, codigo) {
  commit('setCodigo', codigo)
}

export function setActiveProduct ({ commit }, product) {
  commit('setActiveProduct', product)
}

export function setLastError ({ commit }, error) {
  commit('setError', error)
}

export function setLoggedInUser ({ commit, state }, serverResponse) {
  console.log(`setLoggedInUser: ${JSON.stringify(serverResponse)}`)
  if (serverResponse) {
    commit('setLoggedInUser', serverResponse.session)
    commit('updateConfiguration', serverResponse.conf)
  } else {
    commit('setLoggedInUser', null)
  }
}

// configuración

export function updateConfiguration ({ commit }, payload) {
  commit('updateConfiguration', payload)
}

export function setLanguage ({ commit }, value) {
  commit('setLanguage', value)
}

export function setHistorySize ({ commit }, value) {
  commit('setHistorysize', value)
}

export function setBaseURL ({ commit }, value) {
  commit('setBaseURL', value)
}
