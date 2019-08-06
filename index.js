const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000

const convert = require('./lib/convert').convert

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/result', async (req, res) => {
  const { cotacao, quantidade } = req.query
  const resultConvert = await convert(cotacao, quantidade)

  const result = {
    valueCotacao: parseFloat(cotacao),
    valueQuantidade: parseFloat(quantidade),
    resultado: parseFloat(resultConvert)
  }

  res.render('result', { result })
})
app.listen(port, (err) => err ? console.log(err) : console.log('funcionando na porta ' + port))
