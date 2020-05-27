export default function () {
  return {
    // state
    loggedInUser: null,
    lastError: null,
    history: [],
    activeProduct: null,
    // configuration
    listProducts: null,
    configuration: {
      baseURL: 'http://localhost:8000',
      cacheSizeProducts: 10
    }
  }
}
