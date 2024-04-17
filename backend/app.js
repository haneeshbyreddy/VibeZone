const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Users = require('./models/users.model.js')
const uri = "mongodb+srv://Demo:Demo@vibezone.kohhjtv.mongodb.net/";

let port = '3001'

app.use(express.json())
app.use(cors())


app.get('/api/getAllUsers', async (req, res) => {
  let allUsers = await Users.find({})
  res.send(allUsers)
})

app.get('/api/:id', async (req, res) => {
  let user = await Users.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ error: "User not found"})
  }
  res.status(200).json(user)
})

app.post('/api/addUser', async (req, res) => {
  let user = await Users.create(req.body)
  res.status(200).json(user)
})

app.post('/api/addPost', async (req, res) => {
  const { userId, post } = req.body
  let user = await Users.findById(userId)
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  user.posts.push(post)
  await user.save()
  res.status(200).json(user)
})

async function startServer(uri) {
  await mongoose.connect(uri).then(() => {
    console.log('connected to databse')
  })
  .catch(() => {
    console.log('connection to database failed')
  }) 
  app.listen(port, '202.133.54.90')
}

startServer(uri)
