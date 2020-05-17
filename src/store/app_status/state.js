export default function () {
  return {
    // state
    lastError: null,
    cacheProduct: {},
    cacheIndex: 0,
    product: {
      amino_acids_prev_tags: [],
      update_key: 'ingredients20200511',
      checkers: [],
      created_t: 1345799269,
      complete: 1,
      image_front_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg',
      labels_prev_hierarchy: [
        'en:gluten-free'
      ],
      origins: 'Thailand',
      countries_debug_tags: [],
      ingredients_text_debug: 'RICE NOODLES (RICE, WATER), SEASONING PACKET (PEANUT, SUGAR, SALT, CORN STARCH, SPICES [CHILI, CINNAMON, PEPPER, CUMIN, CLOVE], HYDRDLYZED SOY PROTEIN, GREEN ONIONS, CITRIC ACID, PEANUT OIL, SESAME OIL, : NATURAL FLAVOR : ).',
      ingredients_text: 'Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.',
      debug_param_sorted_langs: [
        'en'
      ],
      manufacturing_places: '',
      unknown_nutrients_tags: [],
      scans_n: 3,
      id: '737628064502',
      traces_from_user: '(en) en:peanuts',
      sources: [
        {
          import_t: 1489067409,
          fields: [
            'brands',
            'countries'
          ],
          images: [],
          id: 'usda-ndb',
          url: 'https://api.nal.usda.gov/ndb/reports/?ndbno=45108002&type=f&format=json&api_key=DEMO_KEY'
        },
        {
          import_t: 1587581231,
          fields: [
            'product_name_en',
            'categories',
            'brand_owner',
            'data_sources',
            'nutrition_data_per',
            'serving_size',
            'ingredients_text_en',
            'nutrients.calcium_unit',
            'nutrients.calcium_value',
            'nutrients.carbohydrates_value',
            'nutrients.cholesterol_unit',
            'nutrients.cholesterol_value',
            'nutrients.energy_value',
            'nutrients.energy-kcal_value',
            'nutrients.fat_value',
            'nutrients.fiber_value',
            'nutrients.iron_unit',
            'nutrients.iron_value',
            'nutrients.proteins_value',
            'nutrients.salt_unit',
            'nutrients.salt_value',
            'nutrients.saturated-fat_value',
            'nutrients.sugars_value',
            'nutrients.trans-fat_unit',
            'nutrients.trans-fat_value',
            'nutrients.vitamin-a_unit',
            'nutrients.vitamin-a_value',
            'nutrients.vitamin-c_unit',
            'nutrients.vitamin-c_value'
          ],
          name: 'database-usda',
          manufacturer: null,
          images: [],
          id: 'database-usda',
          url: null
        }
      ],
      additives_tags_n: null,
      nutrition_data_per: '100g',
      no_nutrition_data: '',
      nutriscore_grade: 'c',
      product_quantity: '155',
      allergens: '',
      informers_tags: [
        'andre',
        'manu1400',
        'thierrym',
        'upcbot',
        'smartchef',
        'org-database-usda'
      ],
      generic_name_en_debug_tags: [],
      ingredients_n: 18,
      image_ingredients_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.400.jpg',
      image_nutrition_thumb_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.100.jpg',
      ingredients: [
        {
          id: 'en:noodle',
          percent_max: 100,
          percent_min: 7.69230769230769,
          text: 'Noodle',
          has_sub_ingredients: 'yes',
          rank: 1
        },
        {
          percent_max: 50,
          id: 'en:water',
          rank: 2,
          vegan: 'yes',
          vegetarian: 'yes',
          text: 'water',
          percent_min: 0
        },
        {
          id: 'en:seasoning packet',
          percent_max: 33.3333333333333,
          text: 'seasoning packet',
          percent_min: 0,
          rank: 3,
          has_sub_ingredients: 'yes'
        },
        {
          percent_max: 25,
          id: 'en:sugar',
          rank: 4,
          vegan: 'yes',
          vegetarian: 'yes',
          text: 'sugar',
          percent_min: 0
        },
        {
          percent_max: 20,
          id: 'en:hydrolyzed soy protein',
          rank: 5,
          text: 'hydrolyzed soy protein',
          percent_min: 0
        },
        {
          text: 'green onion',
          vegetarian: 'yes',
          percent_min: 0,
          rank: 6,
          vegan: 'yes',
          id: 'en:green-onion',
          percent_max: 16.6666666666667
        },
        {
          id: 'en:corn-maltodextrin',
          percent_max: 14.2857142857143,
          text: 'corn maltodextrin',
          vegetarian: 'yes',
          percent_min: 0,
          rank: 7,
          vegan: 'yes'
        },
        {
          rank: 8,
          vegan: 'yes',
          vegetarian: 'yes',
          percent_min: 0,
          has_sub_ingredients: 'yes',
          text: 'spice',
          percent_max: 12.5,
          id: 'en:spice'
        },
        {
          text: 'citric acid',
          vegetarian: 'yes',
          percent_min: 0,
          rank: 9,
          vegan: 'yes',
          id: 'en:e330',
          percent_max: 11.1111111111111
        },
        {
          vegan: 'yes',
          rank: 10,
          percent_min: 0,
          vegetarian: 'yes',
          text: 'sea salt',
          percent_max: 10,
          id: 'en:sea-salt'
        },
        {
          has_sub_ingredients: 'yes',
          rank: 11,
          percent_min: 0,
          text: 'extractives of paprika',
          percent_max: 9.09090909090909,
          id: 'en:extractives of paprika'
        },
        {
          percent_min: 0,
          vegetarian: 'yes',
          vegan: 'yes',
          rank: 12,
          text: 'silicon dioxide',
          has_sub_ingredients: 'yes',
          id: 'en:e551',
          percent_max: 8.33333333333333
        },
        {
          percent_min: 0,
          vegetarian: 'yes',
          text: 'yeast extract',
          vegan: 'yes',
          rank: 13,
          id: 'en:yeast-extract',
          percent_max: 7.69230769230769
        },
        {
          percent_min: 7.69230769230769,
          vegetarian: 'yes',
          text: 'rice',
          vegan: 'yes',
          id: 'en:rice',
          percent_max: 100
        },
        {
          text: 'peanut',
          percent_min: 0,
          percent_max: 33.3333333333333,
          id: 'en:peanut'
        },
        {
          text: 'including paprika',
          percent_min: 0,
          id: 'en:including paprika',
          percent_max: 12.5
        },
        {
          id: 'en:colour',
          percent_max: 9.09090909090909,
          percent_min: 0,
          text: 'color'
        },
        {
          id: 'en:added to make free flowing',
          percent_max: 8.33333333333333,
          percent_min: 0,
          text: 'added to make free flowing'
        }
      ],
      data_quality_info_tags: [
        'en:ingredients-percent-analysis-ok'
      ],
      _keywords: [
        'kit',
        'plant-based',
        'thai',
        'food',
        'and',
        'simply',
        'gluten-free',
        'beverage',
        'noodle',
        'cereal',
        'peanut',
        'thailand',
        'their',
        'stir-fry',
        'rice',
        'potatoe',
        'include',
        'asia',
        'seasoning',
        'kitchen',
        'product'
      ],
      codes_tags: [
        'code-13',
        '0737628064xxx',
        '073762806xxxx',
        '07376280xxxxx',
        '0737628xxxxxx',
        '073762xxxxxxx',
        '07376xxxxxxxx',
        '0737xxxxxxxxx',
        '073xxxxxxxxxx',
        '07xxxxxxxxxxx',
        '0xxxxxxxxxxxx'
      ],
      additives_n: 1,
      languages_tags: [
        'en:english',
        'en:1'
      ],
      labels_tags: [
        'en:gluten-free'
      ],
      additives_tags: [
        'en:e330'
      ],
      states_tags: [
        'en:to-be-checked',
        'en:complete',
        'en:nutrition-facts-completed',
        'en:ingredients-completed',
        'en:expiration-date-to-be-completed',
        'en:packaging-code-to-be-completed',
        'en:characteristics-completed',
        'en:categories-completed',
        'en:brands-completed',
        'en:packaging-completed',
        'en:quantity-completed',
        'en:product-name-completed',
        'en:photos-validated',
        'en:photos-uploaded'
      ],
      ingredients_from_palm_oil_n: 0,
      last_edit_dates_tags: [
        '2020-04-22',
        '2020-04',
        '2020'
      ],
      editors: [
        '',
        'thierrym',
        'manu1400',
        'andre',
        'upcbot'
      ],
      nutrient_levels_tags: [
        'en:fat-in-moderate-quantity',
        'en:saturated-fat-in-moderate-quantity',
        'en:sugars-in-high-quantity',
        'en:salt-in-moderate-quantity'
      ],
      nutrition_grade_fr: 'c',
      traces: 'en:peanuts',
      allergens_tags: [],
      lang_debug_tags: [],
      nutrition_score_beverage: 0,
      stores_tags: [],
      allergens_from_ingredients: '',
      interface_version_created: '20120622',
      purchase_places_debug_tags: [],
      serving_size_imported: '0.333 PACKAGE (52 g)',
      last_image_dates_tags: [
        '2012-08-24',
        '2012-08',
        '2012'
      ],
      traces_from_ingredients: '',
      product_name_en_imported: 'Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning',
      minerals_prev_tags: [],
      data_sources_imported: 'Databases, database-usda',
      emb_codes_orig: '',
      lc: 'en',
      emb_codes_20141016: '',
      pnns_groups_2: 'Cereals',
      nova_groups_tags: [
        'en:4-ultra-processed-food-and-drink-products'
      ],
      brand_owner: 'Simply Asia Foods, Inc.',
      interface_version_modified: '20120622',
      states: 'en:to-be-checked, en:complete, en:nutrition-facts-completed, en:ingredients-completed, en:expiration-date-to-be-completed, en:packaging-code-to-be-completed, en:characteristics-completed, en:categories-completed, en:brands-completed, en:packaging-completed, en:quantity-completed, en:product-name-completed, en:photos-validated, en:photos-uploaded',
      ingredients_from_or_that_may_be_from_palm_oil_n: 0,
      additives_old_tags: [
        'en:e330',
        'en:e551'
      ],
      pnns_groups_2_tags: [
        'cereals',
        'known'
      ],
      expiration_date: '',
      allergens_hierarchy: [],
      ingredients_hierarchy: [
        'en:noodle',
        'en:dough',
        'en:water',
        'en:seasoning packet',
        'en:sugar',
        'en:hydrolyzed soy protein',
        'en:green-onion',
        'en:vegetable',
        'en:root-vegetable',
        'en:onion',
        'en:corn-maltodextrin',
        'en:maltodextrins',
        'en:spice',
        'en:e330',
        'en:sea-salt',
        'en:salt',
        'en:extractives of paprika',
        'en:e551',
        'en:yeast-extract',
        'en:yeast',
        'en:rice',
        'en:peanut',
        'en:including paprika',
        'en:colour',
        'en:added to make free flowing'
      ],
      image_small_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.200.jpg',
      editors_tags: [
        'manu1400',
        'upcbot',
        'smartchef',
        'openfoodfacts-contributors',
        'usda-ndb-import',
        'org-database-usda',
        'andre',
        'thierrym'
      ],
      other_nutritional_substances_tags: [],
      ciqual_food_name_tags: [
        'unknown'
      ],
      selected_images: {
        front: {
          display: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg'
          },
          thumb: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.100.jpg'
          },
          small: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.200.jpg'
          }
        },
        nutrition: {
          small: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.200.jpg'
          },
          thumb: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.100.jpg'
          },
          display: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.400.jpg'
          }
        },
        ingredients: {
          display: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.400.jpg'
          },
          small: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.200.jpg'
          },
          thumb: {
            en: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.100.jpg'
          }
        }
      },
      image_ingredients_small_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.200.jpg',
      image_nutrition_small_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.200.jpg',
      nutrition_data_prepared_per_debug_tags: [],
      purchase_places: '',
      categories_imported: 'Plant-based foods and beverages, Plant-based foods, Cereals and potatoes, Cereals and their products, Noodles',
      image_front_thumb_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.100.jpg',
      expiration_date_debug_tags: [],
      serving_size: '0.333 PACKAGE (52 g)',
      unique_scans_n: 1,
      image_thumb_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.100.jpg',
      stores_debug_tags: [],
      categories_tags: [
        'en:plant-based-foods-and-beverages',
        'en:plant-based-foods',
        'en:cereals-and-potatoes',
        'en:cereals-and-their-products',
        'en:noodles',
        'en:rice-noodles'
      ],
      creator: 'openfoodfacts-contributors',
      generic_name_en: 'Rice Noodles',
      nova_group_debug: ' -- ingredients/en:sugar : 3 -- ingredients/en:colour : 4',
      categories_hierarchy: [
        'en:plant-based-foods-and-beverages',
        'en:plant-based-foods',
        'en:cereals-and-potatoes',
        'en:cereals-and-their-products',
        'en:noodles',
        'en:Rice Noodles'
      ],
      nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: 0,
      cities_tags: [],
      image_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg',
      code: '0737628064502',
      product_name: 'Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning',
      nutrition_data_prepared_per_imported: '100g',
      correctors_tags: [
        'andre',
        'thierrym',
        'usda-ndb-import',
        'smartchef',
        'org-database-usda'
      ],
      max_imgid: '5',
      serving_size_debug_tags: [],
      product_name_en_debug_tags: [],
      nutrition_data_prepared_per: '100g',
      checkers_tags: [],
      product_name_en: 'Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning',
      known_ingredients_n: 20,
      countries_hierarchy: [
        'en:france',
        'en:united-states'
      ],
      traces_hierarchy: [
        'en:peanuts'
      ],
      last_modified_by: 'org-database-usda',
      ingredients_n_tags: [
        '18',
        '11-20'
      ],
      ingredients_from_palm_oil_tags: [],
      lang: 'en',
      categories_lc: 'en',
      ingredients_debug: [
        'RICE NOODLES ',
        '(',
        '(',
        null,
        null,
        'RICE',
        ',',
        null,
        null,
        null,
        ' WATER)',
        ',',
        null,
        null,
        null,
        ' SEASONING PACKET ',
        '(',
        '(',
        null,
        null,
        'PEANUT',
        ',',
        null,
        null,
        null,
        ' SUGAR',
        ',',
        null,
        null,
        null,
        ' SALT',
        ',',
        null,
        null,
        null,
        ' CORN STARCH',
        ',',
        null,
        null,
        null,
        ' SPICES ',
        '[',
        '[',
        null,
        null,
        'CHILI',
        ',',
        null,
        null,
        null,
        ' CINNAMON',
        ',',
        null,
        null,
        null,
        ' PEPPER',
        ',',
        null,
        null,
        null,
        ' CUMIN',
        ',',
        null,
        null,
        null,
        ' CLOVE]',
        ',',
        null,
        null,
        null,
        ' HYDRDLYZED SOY PROTEIN',
        ',',
        null,
        null,
        null,
        ' GREEN ONIONS',
        ',',
        null,
        null,
        null,
        ' CITRIC ACID',
        ',',
        null,
        null,
        null,
        ' PEANUT OIL',
        ',',
        null,
        null,
        null,
        ' SESAME OIL',
        ',',
        null,
        null,
        null,
        ' ',
        ':',
        ':',
        null,
        null,
        ' NATURAL FLAVOR ',
        ':',
        ':',
        null,
        null,
        ' ).'
      ],
      nova_group: 4,
      last_image_t: 1345799925,
      serving_quantity: '52',
      allergens_from_user: '(en) ',
      link: '',
      ingredients_text_en_debug_tags: [],
      origins_tags: [
        'thailand'
      ],
      languages_hierarchy: [
        'en:english'
      ],
      states_hierarchy: [
        'en:to-be-checked',
        'en:complete',
        'en:nutrition-facts-completed',
        'en:ingredients-completed',
        'en:expiration-date-to-be-completed',
        'en:packaging-code-to-be-completed',
        'en:characteristics-completed',
        'en:categories-completed',
        'en:brands-completed',
        'en:packaging-completed',
        'en:quantity-completed',
        'en:product-name-completed',
        'en:photos-validated',
        'en:photos-uploaded'
      ],
      image_front_small_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.200.jpg',
      nutrition_data_prepared: '',
      languages: {
        'en:english': 6
      },
      pnns_groups_1: 'Cereals and potatoes',
      languages_codes: {
        en: 6
      },
      nutriscore_score: 4,
      packaging_debug_tags: [],
      image_ingredients_thumb_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/ingredients_en.10.100.jpg',
      data_quality_warnings_tags: [
        'en:nutrition-value-very-high-for-category-sugars'
      ],
      quantity: '155 g',
      nutrition_data_per_imported: '100g',
      nova_groups: '4',
      purchase_places_tags: [],
      sources_fields: {
        'org-database-usda': {
          fdc_id: '628190',
          available_date: '2019-09-25T00:00:00Z',
          fdc_category: 'All Noodles',
          publication_date: '2019-12-06T00:00:00Z',
          modified_date: '2019-09-25T00:00:00Z',
          fdc_data_source: 'LI'
        }
      },
      labels: 'Gluten-free',
      last_editor: 'org-database-usda',
      rev: 19,
      completeness: 0.8,
      additives_debug_tags: [],
      new_additives_n: 1,
      labels_lc: 'en',
      emb_codes_debug_tags: [],
      completed_t: 1355184837,
      data_quality_bugs_tags: [],
      origins_debug_tags: [],
      image_nutrition_url: 'https://static.openfoodfacts.org/images/products/073/762/806/4502/nutrition_en.12.400.jpg',
      compared_to_category: 'en:noodles',
      misc_tags: [
        'en:nutrition-fruits-vegetables-nuts-estimate-from-ingredients',
        'en:nutrition-all-nutriscore-values-known',
        'en:nutriscore-computed'
      ],
      ingredients_text_with_allergens: 'Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.',
      stores: '',
      vitamins_tags: [],
      manufacturing_places_debug_tags: [],
      ingredients_analysis_tags: [
        'en:palm-oil-content-unknown',
        'en:vegan-status-unknown',
        'en:vegetarian-status-unknown'
      ],
      nutrition_data: 'on',
      nutrition_grades_tags: [
        'c'
      ],
      nutrition_data_per_debug_tags: [],
      ingredients_original_tags: [
        'en:noodle',
        'en:water',
        'en:seasoning packet',
        'en:sugar',
        'en:hydrolyzed soy protein',
        'en:green-onion',
        'en:corn-maltodextrin',
        'en:spice',
        'en:e330',
        'en:sea-salt',
        'en:extractives of paprika',
        'en:e551',
        'en:yeast-extract',
        'en:rice',
        'en:peanut',
        'en:including paprika',
        'en:colour',
        'en:added to make free flowing'
      ],
      informers: [
        'andre',
        'manu1400',
        'thierrym'
      ],
      additives_prev_original_tags: [
        'en:e330'
      ],
      sortkey: 301587581231,
      entry_dates_tags: [
        '2012-08-24',
        '2012-08',
        '2012'
      ],
      vitamins_prev_tags: [],
      ingredients_ids_debug: [
        'rice-noodles',
        'rice',
        'water',
        'seasoning-packet',
        'peanut',
        'sugar',
        'salt',
        'corn-starch',
        'spices',
        'chili',
        'cinnamon',
        'pepper',
        'cumin',
        'clove',
        'hydrdlyzed-soy-protein',
        'green-onions',
        'citric-acid',
        'peanut-oil',
        'sesame-oil',
        'natural-flavor'
      ],
      packaging: 'Cellophane,Carton',
      data_quality_tags: [
        'en:ingredients-percent-analysis-ok',
        'en:nutrition-value-very-high-for-category-sugars'
      ],
      data_sources_tags: [
        'databases',
        'database-usda'
      ],
      manufacturing_places_tags: [],
      generic_name: 'Rice Noodles',
      quantity_debug_tags: [],
      brands: 'Thai Kitchen,Simply Asia',
      additives_original_tags: [
        'en:e330'
      ],
      nutrition_grades: 'c',
      nucleotides_tags: [],
      nutriscore_data: {
        saturated_fat_ratio_value: 25,
        grade: 'c',
        score: 4,
        fruits_vegetables_nuts_colza_walnut_olive_oils_points: 0,
        sugars_points: 2,
        sodium: 288,
        sodium_points: 3,
        fiber: 1.9,
        saturated_fat_value: 1.9,
        is_cheese: 0,
        fruits_vegetables_nuts_colza_walnut_olive_oils: 0,
        sugars_value: 13.46,
        fiber_points: 1,
        energy_value: 1611,
        is_fat: 0,
        saturated_fat_ratio_points: 3,
        is_water: 0,
        negative_points: 10,
        sugars: 13.46,
        energy_points: 4,
        positive_points: 6,
        energy: 1611,
        is_beverage: 0,
        saturated_fat: 1.92,
        fiber_value: 1.9,
        sodium_value: 288,
        fruits_vegetables_nuts_colza_walnut_olive_oils_value: 0,
        saturated_fat_points: 1,
        proteins: 9.62,
        proteins_points: 5,
        proteins_value: 9.62,
        saturated_fat_ratio: 24.9674902470741
      },
      ingredients_that_may_be_from_palm_oil_tags: [],
      labels_hierarchy: [
        'en:gluten-free'
      ],
      countries_imported: 'United States',
      photographers: [
        'andre'
      ],
      lc_imported: 'en',
      ingredients_text_with_allergens_en: 'Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.',
      'fruits-vegetables-nuts_100g_estimate': 0,
      packaging_tags: [
        'cellophane',
        'carton'
      ],
      amino_acids_tags: [],
      nutrient_levels: {
        sugars: 'high',
        'saturated-fat': 'moderate',
        salt: 'moderate',
        fat: 'moderate'
      },
      emb_codes: '',
      correctors: [
        'andre',
        'thierrym'
      ],
      additives_old_n: 2,
      images: {
        ingredients_en: {
          sizes: {
            400: {
              w: 400,
              h: 289
            },
            full: {
              w: 1281,
              h: 927
            },
            200: {
              h: 145,
              w: 200
            },
            100: {
              w: 100,
              h: 72
            }
          },
          normalize: 'checked',
          geometry: '0x0--3--3',
          rev: '10',
          white_magic: null,
          imgid: '4'
        },
        nutrition_en: {
          geometry: '0x0--4--4',
          sizes: {
            full: {
              h: 1611,
              w: 870
            },
            200: {
              h: 200,
              w: 108
            },
            400: {
              h: 400,
              w: 216
            },
            100: {
              h: 100,
              w: 54
            }
          },
          normalize: 'checked',
          imgid: '5',
          white_magic: null,
          rev: '12'
        },
        5: {
          uploader: 'andre',
          sizes: {
            full: {
              h: 1611,
              w: 870
            },
            400: {
              w: 216,
              h: 400
            },
            100: {
              w: 54,
              h: 100
            }
          },
          uploaded_t: 1345799925
        },
        2: {
          uploaded_t: 1345799309,
          sizes: {
            100: {
              h: 100,
              w: 72
            },
            full: {
              w: 1311,
              h: 1812
            },
            400: {
              w: 289,
              h: 400
            }
          },
          uploader: 'andre'
        },
        1: {
          uploader: 'openfoodfacts-contributors',
          uploaded_t: 1345799270,
          sizes: {
            400: {
              w: 400,
              h: 284
            },
            full: {
              h: 1089,
              w: 1536
            },
            100: {
              w: 100,
              h: 71
            }
          }
        },
        3: {
          sizes: {
            full: {
              w: 1281,
              h: 927
            },
            400: {
              h: 289,
              w: 400
            },
            100: {
              h: 72,
              w: 100
            }
          },
          uploaded_t: 1345799558,
          uploader: 'andre'
        },
        4: {
          uploader: 'andre',
          uploaded_t: 1345799666,
          sizes: {
            100: {
              w: 100,
              h: 72
            },
            400: {
              h: 289,
              w: 400
            },
            full: {
              h: 927,
              w: 1281
            }
          }
        },
        front_en: {
          sizes: {
            200: {
              h: 200,
              w: 145
            },
            full: {
              w: 1311,
              h: 1812
            },
            400: {
              w: 289,
              h: 400
            },
            100: {
              w: 72,
              h: 100
            }
          },
          normalize: null,
          geometry: '0x0--4--4',
          rev: '6',
          imgid: '2',
          white_magic: null
        },
        ingredients: {
          sizes: {
            400: {
              w: 400,
              h: 289
            },
            full: {
              w: 1281,
              h: 927
            },
            200: {
              h: 145,
              w: 200
            },
            100: {
              w: 100,
              h: 72
            }
          },
          normalize: 'checked',
          geometry: '0x0--3--3',
          rev: '10',
          white_magic: null,
          imgid: '4'
        },
        nutrition: {
          geometry: '0x0--4--4',
          sizes: {
            full: {
              h: 1611,
              w: 870
            },
            200: {
              h: 200,
              w: 108
            },
            400: {
              h: 400,
              w: 216
            },
            100: {
              h: 100,
              w: 54
            }
          },
          normalize: 'checked',
          imgid: '5',
          white_magic: null,
          rev: '12'
        },
        front: {
          sizes: {
            200: {
              h: 200,
              w: 145
            },
            full: {
              w: 1311,
              h: 1812
            },
            400: {
              w: 289,
              h: 400
            },
            100: {
              w: 72,
              h: 100
            }
          },
          normalize: null,
          geometry: '0x0--4--4',
          rev: '6',
          imgid: '2',
          white_magic: null
        }
      },
      nutriments: {
        iron_serving: 0.000359,
        cholesterol_100g: 0,
        fiber_value: 1.9,
        sugars: 13.46,
        calcium_unit: 'mg',
        fiber_unit: 'g',
        proteins_value: 9.62,
        cholesterol_serving: 0,
        cholesterol_unit: 'mg',
        'saturated-fat_unit': 'g',
        'trans-fat_100g': 0,
        'vitamin-c_100g': 0,
        'trans-fat_serving': 0,
        'vitamin-c': 0,
        sodium: 0.288,
        cholesterol: 0,
        'vitamin-a': 0.0001155,
        'energy-kcal_serving': 838,
        carbohydrates_100g: 71.15,
        iron: 0.00069,
        carbohydrates: 71.15,
        calcium_100g: 0.038,
        salt_100g: 0.72,
        iron_unit: 'mg',
        salt_serving: 0.374,
        'trans-fat_value': 0,
        calcium_value: 38,
        'nova-group_100g': 4,
        proteins_serving: 5,
        'nova-group': 4,
        sugars_100g: 13.46,
        'saturated-fat_100g': 1.92,
        fat_unit: 'g',
        salt_value: 720,
        energy_unit: 'kcal',
        calcium: 0.038,
        'vitamin-c_value': 0,
        'vitamin-a_100g': 0.0001155,
        carbohydrates_value: 71.15,
        'vitamin-a_unit': 'IU',
        proteins_unit: 'g',
        'vitamin-c_unit': 'mg',
        'saturated-fat_serving': 0.998,
        fat: 7.69,
        'saturated-fat_value': 1.92,
        'energy-kcal_unit': 'kcal',
        'trans-fat': 0,
        fat_100g: 7.69,
        'saturated-fat': 1.92,
        sugars_value: 13.46,
        cholesterol_value: 0,
        fiber_serving: 0.988,
        'energy-kcal': 1611,
        'vitamin-c_serving': 0,
        proteins_100g: 9.62,
        salt: 0.72,
        calcium_serving: 0.0198,
        fat_value: 7.69,
        carbohydrates_unit: 'g',
        sugars_serving: 7,
        salt_unit: 'mg',
        sugars_unit: 'g',
        energy: 1611,
        sodium_100g: 0.288,
        proteins: 9.62,
        iron_100g: 0.00069,
        sodium_unit: 'mg',
        sodium_serving: 0.15,
        'nutrition-score-fr': 4,
        sodium_value: 288,
        'vitamin-a_value': 385,
        fiber: 1.9,
        'fruits-vegetables-nuts-estimate-from-ingredients_100g': 0,
        fat_serving: 4,
        energy_100g: 1611,
        'energy-kcal_100g': 1611,
        energy_value: 385,
        'nova-group_serving': 4,
        iron_value: 0.69,
        fiber_100g: 1.9,
        energy_serving: 838,
        'nutrition-score-fr_100g': 4,
        'vitamin-a_serving': 6.01e-05,
        carbohydrates_serving: 37,
        'energy-kcal_value': 385,
        'trans-fat_unit': 'g'
      },
      last_modified_t: 1587581231,
      traces_debug_tags: [],
      popularity_tags: [
        'top-90-percent-scans-2019',
        'top-95-percent-scans-2019',
        'top-10000-it-scans-2019',
        'top-50000-it-scans-2019',
        'top-100000-it-scans-2019',
        'top-country-it-scans-2019'
      ],
      ingredients_that_may_be_from_palm_oil_n: 0,
      pnns_groups_1_tags: [
        'cereals-and-potatoes',
        'known'
      ],
      data_sources: 'Databases, database-usda',
      countries_lc: 'en',
      brands_debug_tags: [],
      brands_tags: [
        'thai-kitchen',
        'simply-asia'
      ],
      countries_tags: [
        'en:france',
        'en:united-states'
      ],
      _id: '0737628064502',
      brand_owner_imported: 'Simply Asia Foods, Inc.',
      labels_prev_tags: [
        'en:gluten-free'
      ],
      ingredients_percent_analysis: 1,
      category_properties: {
      },
      unknown_ingredients_n: 5,
      traces_tags: [
        'en:peanuts'
      ],
      photographers_tags: [
        'openfoodfacts-contributors',
        'andre'
      ],
      link_debug_tags: [],
      categories: 'Rice Noodles, Plant-based foods and beverages, Plant-based foods, Cereals and potatoes, Cereals and their products, Noodles',
      countries: 'France, United States',
      nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: 1,
      emb_codes_tags: [],
      data_quality_errors_tags: [],
      ingredients_tags: [
        'en:noodle',
        'en:dough',
        'en:water',
        'en:seasoning-packet',
        'en:sugar',
        'en:hydrolyzed-soy-protein',
        'en:green-onion',
        'en:vegetable',
        'en:root-vegetable',
        'en:onion',
        'en:corn-maltodextrin',
        'en:maltodextrins',
        'en:spice',
        'en:e330',
        'en:sea-salt',
        'en:salt',
        'en:extractives-of-paprika',
        'en:e551',
        'en:yeast-extract',
        'en:yeast',
        'en:rice',
        'en:peanut',
        'en:including-paprika',
        'en:colour',
        'en:added-to-make-free-flowing'
      ],
      minerals_tags: [],
      ingredients_text_en_imported: 'Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.',
      ingredients_text_en: 'Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.',
      nucleotides_prev_tags: []
    },
    // configuration
    baseURL: 'https://world.openfoodfacts.org/api/v0',
    configuration: {
      labelsButtons: true,
      cacheSizeProducts: 10
    }
  }
}
