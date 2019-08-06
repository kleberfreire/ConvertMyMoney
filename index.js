const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/result', (req, res) => {
  const convercao = req.query.cotacao * req.query.quantidade
  const result = {
    valueCotacao: parseFloat(req.query.cotacao),
    valueQuantidade: parseFloat(req.query.quantidade),
    resultado: parseFloat(convercao)
  }

  res.render('result', { result })
})
app.listen(port, (err) => err ? console.log(err) : console.log('funcionando na porta ' + port))
