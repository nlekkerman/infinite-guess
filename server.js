console.log('hello');

const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/playerModel')
const { message } = require('statuses');
const cors = require('cors');
const { AsyncLocalStorage } = require('async_hooks');

const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {

  res.send('Hello What is this')
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
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    })
  }).catch((error) => {

    console.log(error + " velika je greska")
  })