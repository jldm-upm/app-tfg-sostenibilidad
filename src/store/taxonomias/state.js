const additiveClasses = require('./tax/additives_classes.js').val
const ingredientsAnalysis = require('./tax/ingredients_analysis.js').val
const labelstags = require('./tax/labels.js').val
const ingredients = require('./tax/ingredients.js').val
const sustainability = require('./tax/sustainability.js').val

export default function () {
  return {
    //
    taxonomies: {
      lastupdate: 0,

      additiveClasses: additiveClasses,
      additives: null,
      allergens: null,
      categories: null,
      brands: null,
      countries: null,
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
