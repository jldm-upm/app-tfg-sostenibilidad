/*
  export function someAction (context) {
  }
*/
export function setCodigo ({ commit }, codigo) {
  commit('setCodigo', codigo)
}

export async function setActiveProduct ({ commit, dispatch }, product) {
  commit('setActiveProduct', product)
}

export function setLastError ({ commit }, error) {
  commit('setError', error)
}

export async function setLoggedInUser ({ commit, state, dispatch }, serverResponse) {
  if (serverResponse) {
    if (serverResponse.status === 1) {
      commit('setLoggedInUser', serverResponse.session)
      await dispatch('updateConfiguration', serverResponse.conf)
      await dispatch('setVot', serverResponse.vot)
    } else {
      commit('setLoggedInUser', null)
      await dispatch('setVot', {})
    }
  } else {
    commit('setLoggedInUser', null)
    await dispatch('setVot', {})
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

export function setPageSize ({ commit }, value) {
  commit('setPageSize', value)
}

export function setBaseURL ({ commit }, value) {
  commit('setBaseURL', value)
}

export async function setVot ({ commit, dispatch }, val) {
  commit('setVot', val)
}

export function votar ({ commit }, voto) {
  // voto = { code, sus, val }
  commit('votar', voto)
}

export function setUserSustainability ({ commit }, sus) {
  // sus = { sustainability, value }
  commit('setUserSustainability', sus)
}

export function setListProducts ({ commit }, val) {
  commit('setListProducts', val)
}

export function setUseOtherServices ({ commit }, val) {
  commit('setUseOtherServices', val)
}

export function setCountry ({ commit }, val) {
  commit('setCountry', val)
}
