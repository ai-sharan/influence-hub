const mongoose = require('mongoose')

const businessProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: { type: String, required: true },
  industryType: {
    type: String,
    enum: ['Hotel', 'Restaurant', 'Retail', 'Salon', 'Gym', 'Cafe', 'Other'],
    required: true
  },
  city: { type: String, required: true },
  description: { type: String },
  businessPhotos: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model('BusinessProfile', businessProfileSchema)