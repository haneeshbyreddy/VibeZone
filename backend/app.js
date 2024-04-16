const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Users = require('./models/users.model.js')
const uri = "mongodb+srv://Demo:Demo@vibezone.kohhjtv.mongodb.net/";

let port = '3000'

app.use(express.json())

app.get('/', (req,res) => {
  res.send('Hello')
});

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
  app.listen(port, () => {
    console.log(`App is running on ${port}`)
  })
}

startServer(uri)
