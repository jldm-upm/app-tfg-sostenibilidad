export function getTraduccion (taxonomia, val, lang) {
  return taxonomia[val].name[lang]
}
