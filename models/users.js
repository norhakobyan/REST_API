const mongoose = require('mongoose');
const shortid = require('shortid');

function generateAPIkay() {
  return shortid.generate();
}

const Userchema = new mongoose.Schema({
  name:{
    type: String
  },
  age: {
    type: Number,
    default: 18
  },
  username: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
  },
  signed: {
    type: Boolean,
    default: false
  },
  APIkey: {
    type: String,
    default: generateAPIkay
  }
});

module.exports = Userchema;