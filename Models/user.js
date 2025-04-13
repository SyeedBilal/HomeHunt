const mongoose = require('mongoose');
// const favourites = require('./favourites');


const userSchema =  new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  userType:{
    type:String,
    enum:['host','guest'],
    default:'guest'
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }],
  
});

module.exports=mongoose.model('User',userSchema);