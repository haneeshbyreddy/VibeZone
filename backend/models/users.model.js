const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"]
    },
    profileImage: {
      type: String,
      require: [true, "Add a profile Pic"]
    },
    posts: [String],
  },
  {
    timestamps: true,
  },
)

const Users = mongoose.model('User', UsersSchema)
module.exports = Users
