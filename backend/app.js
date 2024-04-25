const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const Users = require('./models/users.model.js');
const multer = require('multer');
const uri = "mongodb+srv://Demo:Demo@vibezone.kohhjtv.mongodb.net/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.id;
    const uploadPath = `./uploads/${userId}`;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage
}).single('file');

let port = '3001';

app.use(express.json());
app.use(cors());

app.get('/api/getAllUsers', async (req, res) => {
  let allUsers = await Users.find({});
  res.send(allUsers);
});

app.get('/api/:id', async (req, res) => {
  let user = await Users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const userDir = `./uploads/${req.params.id}`;
  fs.readdir(userDir, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    user.posts = files.map(file => `https://api.vibezone.space/uploads/${req.params.id}/${file}`);
    res.status(200).json(user);
  });
});

app.use('/uploads', express.static('uploads'));

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await Users.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    passwordMatch = ( password == user.password )

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }
    res.status(200).json({ message: user._id });
})

app.post('/api/register', async (req, res) => {
  req.body.description = req.body.description || '';
  req.body.profileImage = req.body.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const newUser = await Users.create(req.body);
  const folderName = newUser._id.toString();
  const folderPath = path.join(__dirname, 'uploads', folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  res.status(200).json(newUser)
})

app.post('/api/:id/uploadFile', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('File uploaded successfully');
    res.status(200).send('File uploaded successfully');
  });
});

app.post('/api/:id/deletePost', async (req, res) => {
  const userId = req.params.id;
  const imgUrl = req.body.imgURL;
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }
  const filename = path.basename(imgUrl);
  const filePath = path.join(__dirname, 'uploads', userId, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  fs.unlinkSync(filePath);
  res.status(200).json({ message: 'Post deleted successfully' });
});

app.get('/api/:id/files', (req, res) => {
  const userDir = `./uploads/${req.params.id}`;
  fs.readdir(userDir, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(files);
  });
});

async function startServer(uri) {
  await mongoose.connect(uri).then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection to database failed');
  });
  app.listen(port, '202.133.54.90');
}

startServer(uri);