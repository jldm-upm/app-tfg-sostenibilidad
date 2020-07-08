import axios from 'axios'

const CTE_ESCALADO = 5

// devuelve un valor [0-5)
export function calcularSostenibilidadUsuario (producto, confUsuario, taxonomia) {
  // const lengthTax = Object.keys(taxonomia).length
  let res = 3 // CTE_ESCALADO / 2
  if (producto.sustainability) {
    res = 0.0
    let sumaPuntuaciones = 0.0
    let totalVotaciones = 0.0
    // let totalSumVotaciones = 0.0
    let puntuacionSostenibilidad = 0.0
    for (const sus in taxonomia) {
      sumaPuntuaciones += confUsuario.sustainability[sus]
    }

    sumaPuntuaciones = sumaPuntuaciones === 0 ? 1.0 : sumaPuntuaciones

    for (const sus in taxonomia) {
      totalVotaciones = (producto.sustainability[sus + '_true'] +
                         producto.sustainability[sus + '_false'] +
                         producto.sustainability[sus + '_null'])

      // totalSumVotaciones += totalVotaciones
      // [0-1.0)
      puntuacionSostenibilidad = ((producto.sustainability[sus + '_true'] / Math.max(1, totalVotaciones)) *
                                  (confUsuario.sustainability[sus] / Math.max(1, sumaPuntuaciones)))

      res += puntuacionSostenibilidad
    }

    res = (res * CTE_ESCALADO)
  }

  return res
}

/*
   Devuelve una lista ordenada de productos, ordenada por su sostenibilidad
*/
export async function buscarCategoriaSostenible (baseURL, categoria, pageSize = 10, skip = 0, countries) {
  console.log(`buscarCategoriaSostenible(${baseURL}, ${categoria},${pageSize},${skip})`)
  const resBase = { category: categoria, pageSize: pageSize, skip: skip }
  if (!(categoria) || (categoria === 0)) {
    return { ...resBase, error: null }
  }
  const url = `${baseURL}/category/${categoria}.json?page_size=${pageSize}&skip=${skip}&sort_by=sustainability.sustainability_level&sort=-1&?countries=${countries}`

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
