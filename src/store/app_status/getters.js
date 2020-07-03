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

export function getPageSize (state) {
  return state.configuration.pageSize
}

export function getListProducts (state) {
  return state.listProducts
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

export function getVot (state) {
  return state.vot
}

export function getVotacion (state, getters) {
  return (sus) => {
    return getters.getVot[getters.getActiveProducto][sus]
  }
}

export function getUseOtherServices (state) {
  return state.configuration.useOtherServices
}
