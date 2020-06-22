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
      baseURL: 'http://localhost:8000',
      historySize: 10,
      pageSize: 10,
      language: 'en',
      sustainability: {
        'en:packaging': 3,
        'en:size': 3,
        'en:palm-oil': 3,
        'en:manufacturing': 3,
        'en:transport': 3,
        'en:storage': 3
      }
    }
  }
}
