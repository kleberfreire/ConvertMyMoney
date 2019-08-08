const axios = require('axios')

const getToDay = () => {
  const data = new Date()
  const dia = data.getDate()
  const mes = data.getMonth() + 1
  const ano = data.getFullYear()

  return `${mes}-${dia}-${ano}`
}

const getUrl = (data) => {
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

  return url
}

const getCotacaoApi = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getCotacao = deps => async () => {
  try {
    const { getToDay, getUrl, getCotacaoApi, extractCotacao } = deps
    const today = getToDay()
    const url = getUrl(today)
    const res = await getCotacaoApi(url)
    const cotacao = extractCotacao(res)
    return cotacao.toFixed(2)
  } catch (err) {
    return ''
  }
}
module.exports = {
  getCotacaoApi,
  extractCotacao,
  getCotacao: getCotacao({ getToDay, getUrl, getCotacaoApi, extractCotacao }),
  getToDay,
  getUrl,
  pure: {
    getCotacao
  }

}
