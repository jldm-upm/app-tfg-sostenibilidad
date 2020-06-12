/*
  export function someAction (context) {
  }
*/
export function setCodigo ({ commit }, codigo) {
  commit('setCodigo', codigo)
}

export async function setActiveProduct ({ commit, state }, product) {
  await commit('setActiveProduct', product)
  await commit('setVot', state.vot)
}

export function setLastError ({ commit }, error) {
  commit('setError', error)
}

export async function setLoggedInUser ({ commit, state }, serverResponse) {
  if (serverResponse) {
    if (serverResponse.status === 1) {
      await commit('setLoggedInUser', serverResponse.session)
      await commit('updateConfiguration', serverResponse.conf)
      await commit('setVot', serverResponse.vot)
    } else {
      await commit('setLoggedInUser', null)
      await commit('setVot', {})
    }
  } else {
    await commit('setLoggedInUser', null)
    await commit('setVot', {})
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

export function votarSostenibilidad ({ commit }, { code, sus, val }) {
  commit('setVotoSostenibilidad', { code: code, sus: sus, val: val })
}

export function setVot ({ commit }, val) {
  commit('setVot', val)
}
