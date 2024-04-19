const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
const Users = require('./models/users.model.js')
const multer = require('multer');
const uri = "mongodb+srv://Demo:Demo@vibezone.kohhjtv.mongodb.net/";

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage
}).single('file');

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
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  user.posts = files.map(file => `https://api.vibezone.space/uploads/${file}`)
  res.status(200).json(user)
})

app.use('/uploads', express.static('uploads'));

app.post('/api/addUser', async (req, res) => {
  let user = await Users.create(req.body)
  res.status(200).json(user)
})

app.post('/api/testPost', async (req, res) => {
  res.status(202).json({ 'result': 'all good' })
})

app.post('/api/661e94247ad53f4fefd1fdf4/uploadFile', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    console.log('File uploaded successfully');
    res.status(200).send('File uploaded successfully');
  });
});


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
