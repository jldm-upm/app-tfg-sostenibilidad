export function traducirTax (valor, taxonomiaJSON, lang) {
  console.log(`traducir_aux(${valor},...,${lang})`)
  let res = valor

  res = taxonomiaJSON[valor].name[lang] || taxonomiaJSON[valor].name.en
  console.log(`traducir_aux(${valor},...,${lang})=${res}`)
  return res
}
