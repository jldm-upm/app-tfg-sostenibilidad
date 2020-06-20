export function traducirTax (valor, taxonomiaJSON, lang) {
  let res = valor

  const obj = taxonomiaJSON[valor]
  if (obj) {
    res = obj.name[lang] || obj.name.en
  }

  return res
}
