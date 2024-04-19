const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Users = require('./models/users.model.js')
const multer = require('multer');
const upload = mutler({dest: 'upload/'})
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

app.post('/api/testPost', async (req, res) => {
  res.status(202).json({ 'result': 'all good' })
})

app.post('/api/:id/uploadFile', upload.single('files'), async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  res.json({message: "sucessfully uploaded files"})
})

app.post('/api/:id/addPost', async (req, res) => {
  let user = await Users.findById(req.params.id)
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  user.posts.push(req.body.imgURL)
  await user.save()
  res.status(200).json(user)
})

app.post('/api/:id/deletePost', async (req, res) => {
  let user = await Users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  let postIndex = user.posts.indexOf(req.body.imgURL);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  user.posts.splice(postIndex, 1);
  await user.save();
  res.status(200).json(user);
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
