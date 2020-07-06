const additiveClasses = require('./tax/additives_classes.js').val
const ingredientsAnalysis = require('./tax/ingredients_analysis.js').val
const labelstags = require('./tax/labels.js').val
const ingredients = require('./tax/ingredients.js').val
const sustainability = require('./tax/sustainability.js').val
const categories = require('./tax/categories.js').val
const brands = require('./tax/brands.js').val
const countries = require('./tax/countries.js').val

export default function () {
  return {
    //
    lastupdate: 0,

    taxonomies: {
      additiveClasses: additiveClasses,
      additives: null,
      allergens: null,
      categories: categories,
      brands: brands,
      countries: countries,
      ingredientsAnalysis: ingredientsAnalysis,
      ingredients: ingredients,
      labels: labelstags,
      languages: null,
      nova_groups: null,
      nutrient_levels: null,
      states: null,
      sustainability: sustainability
    }
  }
}
