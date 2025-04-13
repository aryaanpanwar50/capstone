const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name:{
    type : String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    description: "Array of MongoDB ObjectIds representing friends"
  }]
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
