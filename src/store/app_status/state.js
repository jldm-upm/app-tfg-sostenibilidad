export default function () {
  return {
    // state
    codigo: '',
    loggedInUser: null,
    lastError: null,
    history: [],
    activeProduct: null,
    listProducts: null,
    // cache
    taxonomias: { },
    // configuration
    configuration: {
      baseURL: 'http://localhost:8000',
      cacheSizeProducts: 10,
      language: 'en'
    }
  }
}
