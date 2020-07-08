/*
export function someGetter (state) {
}
*/

export function getTaxIngredientsAnalysis (state) {
  return state.taxonomies.ingredientsAnalysis
}

export function getTaxLabels (state) {
  return state.taxonomies.labels
}

export function getTaxCategories (state) {
  return state.taxonomies.categories
}

export function getTaxIngredientes (state) {
  return state.taxonomies.ingredients
}

export function getTaxSustainability (state) {
  return state.taxonomies.sustainability
}

export function getCountries (state) {
  return state.taxonomies.countries
}

export function getStores (state) {
  return state.taxonomies.stores
}
