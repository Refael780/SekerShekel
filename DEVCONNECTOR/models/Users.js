const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  adress: {
    type: String
  },
  phonNumber: {
    type: String
  },
  token: String,
  expireToken: Date,
  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
