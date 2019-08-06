const convert = (contacao, quantidade) => {
  return contacao * quantidade
}

const toMoney = valor => {
  return parseFloat(valor).toFixed(2)
}

module.exports = {
  convert,
  toMoney
}
