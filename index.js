const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000

const convert = require('./lib/convert')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home', { error: false })
})

app.get('/result', async (req, res) => {
  const { cotacao, quantidade } = req.query
  const resultConvert = await convert.convert(cotacao, quantidade)

  if (cotacao && quantidade) {
    const result = {
      valueCotacao: convert.toMoney(cotacao),
      valueQuantidade: convert.toMoney(quantidade),
      resultado: convert.toMoney(resultConvert)
    }
    res.render('result', { result, error: false })
  } else {
    res.render('result', { error: 'Valores invalidos' })
  }
})
app.listen(port, (err) => err ? console.log(err) : console.log('funcionando na porta ' + port))
