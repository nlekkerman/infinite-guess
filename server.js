console.log('hello');

const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/playerModel')
const { message } = require('statuses');
const cors = require('cors');

const app = express()
// Enable CORS
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {

  res.send('Hello')
})


app.get('/players', async(req, res) => {

try {
  const players = await Product.find({})
  res.status(200).json(players)
} catch (error) {
  res.status(500).json({ message: error.message })


}
})

app.post('/players', async(req, res) => {
  try {
      const player = await Product.create(req.body)
      res.status(200).json(player)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

mongoose.connect('mongodb+srv://nlekkerman:CL6xRz3VCE9ka2P@cluster0.uafawfd.mongodb.net/players?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected tmfk mongoo')
    app.listen(3000, () => {
      console.log('running on 3000');
    })
  }).catch((error) => {

    console.log(error + " velika je greska")
  })