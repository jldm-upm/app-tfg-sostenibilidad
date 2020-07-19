// URL del servicio de Open Food Facts que aloja las imágenes de los productos
const URL_BASE_SERVICIO_EXTERNO = 'https://static.openfoodfacts.org/images/products/{localizador}.jpg'

const TIPOS_IMAGENES = ['ingredients', 'ingredients_en', 'nutrition', 'nutrition_en', 'front_en', 'front']

// Convierte un tamaño (100,200,400) en su nombre descriptivo: (_small,_thumb,'') respectivamente.
//
// Parámetros:
// - s: tamaño (100, 200, 400)
// Devuelve:
//   Un string con el tamaño descriptivo (_small,_thumb,'' o null)
function nameSize (s) {
  if (s === '100') {
    return '_small'
  } else if (s === '200') {
    return '_thumb'
  } else if (s === '400') {
    return ''
  } else {
    // hay tamaño 'full' pero no hay URLs a este tamaño
    return null
  }
}

// divide el código del producto: 'XXXXXXXXXXXXX' (13 car) en 'XXX/XXX/XXX/XXXX'
//
// Parámetros:
// - codigo: un código de producto (en principio de cualquier longitud)
// Devuelve:
// - un localizador de la forma: XXX/XXX/XXX/XXXX
function dividirCodigo13 (codigo) {
  // asegurarse que tiene trece caracteres
  let res = codigo.padStart(13, '0').substr(0, 13)
  res = res.substr(0, 3) + '/' + res.substr(3, 3) + '/' + res.substr(6, 3) + '/' + res.substr(9)
  return res
}

// Dado el código, tipo, tamaño y revisión que indentifican una imágen devuelve la URL de la imágen
//
// Se utiliza la var. URL_BASE_SERVICIO_EXTERNO como base de composición (contiene el substring '{localizador}')
// que será reemplazado por el generado con los parámetros de entrada
//
// Parámetros:
// - código : el código del producto
// - tipo: el tipo de la imágen
// - size: tamaño de la imágen
// - rev: revisión de la imágen
// Devuelve:
// - un string representando una URL
function urlImagen (codigo, tipo, size, rev) {
  const loc = dividirCodigo13(codigo)
  return URL_BASE_SERVICIO_EXTERNO.replace('{localizador}', loc + '/' + tipo + '.' + rev + '.' + size)
}

// Devuelve un objeto con las URLS al servicio de almacenamiento de Open Food Facts.
//
// Se utiliza la var. URL_BASE_SERVICIO_EXTERNO como URL base del
// servicio (debe contener el substrin '{localizador}')
//
// El tipo debe de estar en: [ingredients","ingredients_en","nutrition","nutrition_en","front_en","front"]
//
// Parámetros:
// - producto: objeto 'producto' que contiene información de las imágenes en el atributo 'images'
// Devuelve:
// - Un objeto que contiene atributos (de la forma 'image_<tipo>'[_<size>]_url) cuyo valor es un string que
//  representa una URL a la imágen que identifican
export function obtenerImagenes (producto) {
  const res = {}
  if (producto.images) {
    for (const numImagen in Object.keys(producto.images)) {
      const tipoImagen = Object.keys(producto.images)[numImagen]
      if (TIPOS_IMAGENES.includes(tipoImagen)) {
        for (const numSize in Object.keys(producto.images[tipoImagen].sizes)) {
          const size = Object.keys(producto.images[tipoImagen].sizes)[numSize]
          const sName = nameSize(size)
          if (sName) {
            const key = 'image_' + tipoImagen + sName + '_url'
            const value = urlImagen(producto.code, tipoImagen, size, producto.images[tipoImagen].rev)
            res[key] = value
          }
        }
      }
    }
  }
  return res
}
