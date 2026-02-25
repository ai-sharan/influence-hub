const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['influencer', 'business', 'admin'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isDeleted: {
  type: Boolean,
  default: false
},
  verificationToken: {
    type: String
  },
  verificationTokenExpiry: {
    type: Date
  }
}, { timestamps: true })

userSchema.pre('find', function() {
  this.where({ isDeleted: false })
})

userSchema.pre('findOne', function() {
  this.where({ isDeleted: false })
})

userSchema.pre('findOneAndUpdate', function() {
  this.where({ isDeleted: false })
})

module.exports = mongoose.model('User', userSchema)