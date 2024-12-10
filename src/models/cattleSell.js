const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

//define schema
const cattleSellSchema = new mongoose.Schema({
  cattleId: {
    type: Number,
    unique: true,
    auto: true, // Automatically generated (use a plugin like 'mongoose-sequence' for auto-increment)
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  type:{
    type: String,
    required: true,   
    enum :['cows', 'Buffalo', 'Cow-calf', 'Buffalo calf']
  },
  images: [
    {
      filePath: {
        type: String,
        required: false,
      },
      uploadDate: {
        type: Date,
        default: Date.now, // Automatically stores upload timestamp
      },
    },
  ],
  cattleBreed:{
    type:String,
    required:true
  },
  dateOfDelivery:{
    type:Date,
    required:true
  },
  dateOfBirth:{
    type:Date,
    required:false
  },
  numberOfLactation:{
    type:Number,
    required:false,
    default: 0,
  },
  dailyMilkProduction:{
    type:Number,
    required:false,
    default: 0,
  },
  estimatedDailyMilkCapacity:{
    type:Number,
    required:false,
    default: 0,
  },
  isPregnant:{
    type:Boolean,
    required:true,
    default: false,
  },
  usedSemen:{
    type:String,
    required:false,
  },
  isDeworming:{
    type:Boolean,
    required:true,
    default: false,
  },
  isVaccination:{
    type:Boolean,
    required:true,
    default: false,
  },
  isHorn:{
    type:Boolean,
    required:true,
    default: false,
  },
  weight:{
    type:Number,
    required:true,
    default: 0,
  },
  price:{
    type:Number,
    required:true,
    default: 0,
  },
  noOfCalving:{
    type:String,
    required:true,
    default: false
  },
  tagNumber:{
    type:String,
    required:false,
    default: false
  },
  dateOfInsemination:{
    type:Date,
    required:true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

cattleSellSchema.plugin(AutoIncrement, { inc_field: 'cattleId' });

//model create by using schema
const CattleSell = mongoose.model('cattleSell',cattleSellSchema);

module.exports = CattleSell;