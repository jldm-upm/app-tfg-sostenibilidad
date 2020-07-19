import axios from 'axios'

// Valor máximo a devolver (número de estrellas, p.e.)
const CTE_ESCALADO = 5

// devuelve un valor [0-5) con la valoriación del producto escalada
// con las preferencias del usuario
//
// Parámetros:
//  - producto: producto del que se calculará su sostenibilidad personalizada
//  - confSostenibilidadUsuario: configuración del usuario con sus preferencias
//  - taxonomiaSosteniblidad: datos taxonómicos de sostenibilidad
export function calcularSostenibilidadUsuario (producto, confSostenibilidadUsuario, taxonomiaSosteniblidad) {
  let totalValoracionesUsuario = 0.0
  let valoracionesUsuarioNoCero = 0
  for (const pref in confSostenibilidadUsuario) {
    totalValoracionesUsuario += confSostenibilidadUsuario[pref]
    if (confSostenibilidadUsuario[pref] > 0.0) {
      valoracionesUsuarioNoCero = valoracionesUsuarioNoCero + 1
    }
  }
  totalValoracionesUsuario = Math.max(1.0, totalValoracionesUsuario)

  let res = CTE_ESCALADO / 2.0
  const resOk = {}
  const resTotal = { }
  const resMed = { }
  let votTotales = 0

  if (producto.sustainability) {
    // recorrer todos los parámetros de sostenibilidad
    for (const k in taxonomiaSosteniblidad) {
      if (producto.sustainability[k + '_true'] || producto.sustainability[k + '_false']) {
        const votacionesOK = producto.sustainability[k + '_true'] || 0
        // let k_un = (producto.sustainability[k + '_null'] || 0) + (producto.sustainability[k + '_undefined'] || 0)
        const votacionesNoOK = producto.sustainability[k + '_false'] || 0

        const votSustOKnoOk = votacionesOK + votacionesNoOK
        votTotales = votTotales + votSustOKnoOk
        // valor 0 a 1.0 de la opinión de los usuarios sobre ese parámetro para ese producto:
        if (votSustOKnoOk !== 0) {
          // se escalan con las preferencias de usuario
          resMed[k] = (votacionesOK / Math.max(1.0, 1.0 * votSustOKnoOk))
          resOk[k] = votacionesOK
          resTotal[k] = votSustOKnoOk
        }
      }
    }

    // media ponderada
    for (const i in resMed) {
      res += (((resOk[i] / resTotal[i]) * CTE_ESCALADO) * confSostenibilidadUsuario[i] * 1.0)
      console.log(res)
    }
    res = res / totalValoracionesUsuario // media ponderada de proporciones positivas (escaladas)
  } // else res = CTE_ESCALADO / 2.0
  console.log(`calcularSostenibilidadUsuario = ${res}`)
  return res
}

/*
  Devuelve una lista ordenada de productos, ordenada por su sostenibilidad que pertenecen a la
  categoría indicada:

  Parámetros:
   - baseURL: url del servicio (protocolo, host y puerto)
   - categoria: indica la categoría a la que pertenecerán los productos
   - pageSize: número máximo de productos devueltos
   - skip: número de productos "saltados"
   - countries: string con una lista (separadas por comas) de los países a los que pueden pertenecer los productos a buscar

  Devuelve:
    Array de objetos de productos de las categoría y paises indicados
*/
export async function buscarCategoriaSostenible (baseURL, categoria, pageSize = 10, skip = 0, countries) {
  console.log(`buscarCategoriaSostenible(${baseURL}, ${categoria},${pageSize},${skip})`)
  const resBase = { category: categoria, pageSize: pageSize, skip: skip }
  if (!(categoria) || (categoria === 0)) {
    return { ...resBase, error: null }
  }
  const url = `${baseURL}/category/${categoria}.json?page_size=${pageSize}&skip=${skip}&sort_by=sustainability.sustainability_level&order=-1&?countries=${countries}`

  console.log(url)

  try {
    const response = await axios.get(url)

    if (!response) {
      return { ...resBase, error: null }
    } else if (response.data.status === 1) {
      return { ...resBase, response: response }
    } else {
      return { ...resBase, error: response }
    }
  } catch (error) {
    return { ...resBase, error: error }
  }
}
