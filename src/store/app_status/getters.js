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

export function getLoggedInUser (state) {
  return state.loggedInUser
}

export function getHistory (state) {
  return state.history
}

export function getTaxonomias (state) {
  return state.taxonomias
}

// configuración
export function getConfiguration (state) {
  return state.configuration
}

export function getLanguage (state) {
  return state.configuration.language
}

export function getBaseURL (state) {
  return state.configuration.baseURL
}

export function getHistorySize (state) {
  return state.configuration.historySize
}

export function getVotacion (state, { code, sus }) {
  let res = null

  if (state.vot) {
    const vp = state.vot[code]
    if (vp) {
      res = vp[sus]
    }
  }
  return res
}

export function getVot (state) {
  return state.vot
}
