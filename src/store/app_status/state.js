export default function () {
  return {
    // state
    codigo: '',
    loggedInUser: null,
    lastError: null,
    history: [],
    activeProduct: null,
    listProducts: null,
    vot: {},
    // configuration
    configuration: {
      baseURL: 'https://world.openfoodfacts.org',
      historySize: 10,
      language: 'en'
    }
  }
}
