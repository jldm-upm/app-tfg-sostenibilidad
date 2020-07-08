// Función que devuelve una traducción de un 'símbolo'
//
// Utiliza los datos taxonómicos de la BD Open Food Facts
//
// Parámetros:
// - valor: 'símbolo' (como string) a traducir
// - taxomomiaJSON: objeto (representa JSON) con símbolos y sus datos asociados
// - lang: lenguaje al que traducir
// Devuelve:
// Una cadena de texto con la traducción
export function traducirTax (valor, taxonomiaJSON, lang) {
  let res = valor

  const obj = taxonomiaJSON[valor]
  if (obj) {
    res = obj.name[lang] || obj.name.en
  }

  res = res || valor

  return res
}
