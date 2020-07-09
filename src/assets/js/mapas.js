import axios from 'axios'

import { MAPBOX_TOKEN } from './PRIVATE.js'

/*
  Función auxiliar que compone una búsqueda en el servicio Mapbox

  Parámetros:
  - termino: string con el término a buscar en el mapa
  Devuelve:
   Un string que representa una URL indicando el servicio y los parámetros necesarios para buscar el término
*/
function componerBusquedaMapbox (termino) {
  const MAPBOX_SEARCH_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{busqueda}.json?access_token={accesstoken}'

  let res = MAPBOX_SEARCH_URL
  res = res.replace('{busqueda}', termino)
  res = res.replace('{accesstoken}', MAPBOX_TOKEN)

  // console.log(`componerbusquedamapbox(${termino})`)
  return res
}

/*
  Función para buscar en el servicio de MapBox un término

  Parámetros:
  - termino: string con el término a buscar en el servicio MapBox
  Devuelve:
   Un array de posiciones en las que se encuentran los términos
*/
export async function buscarMapbox (termino) {
  const queryString = componerBusquedaMapbox(termino)
  let res = null

  try {
    res = await axios.get(queryString)
  } catch (error) {
    console.log(Object.keys(error))
    return null
  }

  console.log(`buscarMapbox: ${JSON.stringify(res.data)}`)
  return res.data.features.map((f) => f.center)
}

/*
  Función que devuelve la geolocalización del usuario (si es posible).

  Usa la API de navegador

  Parámetros:
  - opciones: opciones para obtener la localización: https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
  Devuelve:
   Una Promesa que devolverá la posición actual
*/
export function obtenerPosicion (pais) {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (posicion) {
          resolve(posicion)
        },
        function () {
          buscarMapbox('country: ' + pais)
            .then(function (arrayPos) {
              reject(arrayPos[0])
            })
            .catch(function () {
              reject([0, 0])
            })
        })
    } else {
      buscarMapbox('country: ' + pais)
        .then(function (arrayPos) {
          reject(arrayPos[0])
        })
        .catch(function () {
          reject([0, 0])
        })
    }
  })
}
