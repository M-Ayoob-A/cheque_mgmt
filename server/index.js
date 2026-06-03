const express = require('express')
const cors = require('cors')
const data = require('./data.js')

const app = express()
app.use(cors())



require('dotenv').config()

const PORT = process.env.PORT


app.get('/cheques', (req, res) => {
  // query params are date, company
  res.json(data)
})

app.get('/cheque:id', (req, res) => {
  res.json("Specific cheque")
})

app.get('/customer:id', (req, res) => {
  res.json("Specific customer")
})


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
