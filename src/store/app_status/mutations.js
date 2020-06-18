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

  if (product) {
    // Actualizar votación del producto
    if (state.vot) {
      Vue.set(state.activeProduct, 'sustainability_user', state.vot[product.code])
    }

    //  Borrar entradas anteriores del mismo producto
    const indexProductRepe = state.history.findIndex((repe) => { return repe._id === product._id })
    if (indexProductRepe > -1) {
      Vue.delete(state.history, indexProductRepe)
    }

    // Actualizar historial de búsqueda
    state.history.push(product)

    // Ajustar el tamaño del array de historia
    if (state.history && (state.history.length === state.configuration.historySize)) {
      Vue.delete(state.history, 0)
    } else if (!(state.history)) {
      Vue.set(state.history, [])
    }
  }
}

export function setError (state, error) {
  state.lastError = error
}

export function setLoggedInUser (state, user) {
  Vue.set(state, 'loggedInUser', user)
}

// configuration

export function setConfiguration (state, conf) {
  state.configuration = conf
}

export function updateConfiguration (state, conf) {
  const confRes = { ...state.configuration, ...conf }
  state.configuration = confRes
}

export function setVot (state, vots) {
  state.vot = vots

  if (vots) {
    if (state.activeProduct) {
      Vue.set(state.activeProduct, 'sustainability_user', state.vot[state.activeProduct.code])
    }
  } else {
    if (state.activeProduct) {
      Vue.set(state.activeProduct, 'sustainability_user', null)
    }
  }
}

export function votar (state, { code, sus, value }) {
  if (state.vot[code]) {
    Vue.set(state.vot[code], sus, value)
  } else {
    const nuevoSus = {}
    nuevoSus[sus] = value
    Vue.set(state.vot, code, nuevoSus)
  }
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
