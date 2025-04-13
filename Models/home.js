// Connecting to MongoDB

const mongoose = require('mongoose');
// const favourites = require('./favourites');

const homeSchema =  new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: String, required: true },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String
  },
  description: {
    type: String
  }
});
module.exports = mongoose.model('Home', homeSchema);


