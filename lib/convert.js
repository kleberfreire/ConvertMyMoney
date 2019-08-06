const convert = (contacao, quantidade) => {
  return contacao * quantidade
}

const toMoney = valor => {
  return valor.toFixed(2)
}

module.exports = {
  convert,
  toMoney
}
