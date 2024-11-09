const mongoose = require('mongoose')

//define schema
const userCoinSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
    auto: true, // Automatically generated (use a plugin like 'mongoose-sequence' for auto-increment)
  },
  totalCoin: {
    type: Number,
    required: true,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

//model create by using schema
const UserCoin = mongoose.model('userCoin',userCoinSchema);

module.exports = UserCoin;