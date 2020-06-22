const CTE_ESCALADO = 5

// devuelve un valor [0-5)
export function calcularSostenibilidadUsuario (producto, confUsuario, taxonomia) {
  console.log(JSON.stringify(producto.sustainability))
  const lengthTax = Object.keys(taxonomia).length

  let res = Math.round(lengthTax / 2)
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
