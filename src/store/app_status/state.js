export default function () {
  return {
    // state
    loggedInUser: 'chars',
    lastError: null,
    history: [],
    activeProduct: null,
    // configuration
    baseURL: 'http://localhost:8000',
    listProducts: null,
    configuration: {
      cacheSizeProducts: 10
    }
  }
}
