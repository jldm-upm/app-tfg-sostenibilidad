import Vue from 'vue'
/*
export function someMutation (state) {
}
*/
export function setCodigo (state, codigo) {
  state.codigo = codigo
}

export function setActiveProduct (state, product) {
  state.activeProduct = product
  if (state.history && (state.history.length === state.configuration.historySize)) {
    Vue.delete(state.history[0])
  } else if (!(state.history)) {
    Vue.set(state.history, [])
  }
  // Vue.set(state.history, state.history.push(product))
  state.history.push(product)
}

export function setError (state, error) {
  state.lastError = error
}

export function setLoggedInUser (state, user) {
  state.loggedInUser = user
}

// configuration

export function setConfiguration (state, conf) {
  state.configuration = conf
}

export function updateConfiguration (state, conf) {
  const confRes = { ...state.configuration, ...conf }
  state.configuration = confRes
}

export function setHistorySize (state, value) {
  state.configuration.historySize = value
}

export function setBaseURL (state, value) {
  state.configuration.baseURL = value
}

export function setLanguage (state, lang) {
  state.configuration.language = lang
}
