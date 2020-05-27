/*
export function someGetter (state) {
}
*/
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
