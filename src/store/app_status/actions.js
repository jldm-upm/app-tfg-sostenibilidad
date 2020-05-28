const axios = require('axios')
/*
export function someAction (context) {
}
*/
export function setCodigo( {commit}, codigo) {
  commit('setCodigo', codigo)
}

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

export function getAndUpdateTaxonomia ({ commit, state }, taxonomia) {
  let tax = null
  if (state.taxonomias[taxonomia]) {
    return state.taxonomias[taxonomia]
  } else {
    const urlTaxonomia = `${state.configuration.baseURL}/data/taxonomies/${taxonomia}.json`
    axios.get(urlTaxonomia)
      .then((resultado) => {
        tax = resultado.data
        commit('setTaxonomia', tax)
      })
      .catch((error) => {
        tax = error
      })
      .finally(() => {
        return tax
      })
  }
}
