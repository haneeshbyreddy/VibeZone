const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"]
    },
    password: {
      type: String,
      required: [true, "Please enter password"]
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String
    },
    connections: [String],
    posts: [String],
  },
  {
    timestamps: true,
  },
)

const Users = mongoose.model('User', UsersSchema)
module.exports = Users