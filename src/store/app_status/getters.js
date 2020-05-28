/*
  export function someGetter (state) {
  }
*/
export function getCodigo (state) {
  return state.codigo
}

export function getActiveProduct (state) {
  return state.activeProduct
}

export function getBaseURL (state) {
  return state.configuration.baseURL
}

export function getConfiguration (state) {
  return state.configuration
}

export function getLoggedInUser (state) {
  return state.loggedInUser
}

export function getHistory (state) {
  return state.history
}

export function getTaxonomia (state, tax) {
  return state.taxonomia[tax]
}

export function getLanguage (state) {
  return state.configuration.language
}
