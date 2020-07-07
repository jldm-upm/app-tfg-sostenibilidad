import axios from 'axios'

import { MAPBOX_TOKEN } from './PRIVATE.js'

/*
  Función auxiliar que compone una búsqueda
*/
function componerBusquedaMapbox (termino) {
  const MAPBOX_SEARCH_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{busqueda}.json?access_token={accesstoken}'

  let res = MAPBOX_SEARCH_URL
  res = res.replace('{busqueda}', termino)
  res = res.replace('{accesstoken}', MAPBOX_TOKEN)

  // console.log(`componerbusquedamapbox(${termino})`)
  return res
}

export async function buscarMapbox (termino) {
  const queryString = componerBusquedaMapbox(termino)
  let res = null

  try {
    res = await axios.get(queryString)
  } catch (error) {
    console.log(Object.keys(error))
    return error
  }

  // console.log(JSON.stringify(res.data))
  return res.data
}

export function getPosition (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
