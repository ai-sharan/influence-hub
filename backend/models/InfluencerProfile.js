const mongoose = require('mongoose')

const portfolioPhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  brandName: { type: String, required: true },
  views: { type: Number },
  likes: { type: Number },
  engagement: { type: Number },
  caption: { type: String }
})

const influencerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  city: { type: String, required: true },
  instagramHandle: { type: String, required: true },
  followerRange: {
    type: String,
    enum: ['1K-10K', '10K-50K', '50K-200K', '200K+'],
    required: true
  },
  niche: [{
    type: String,
    enum: ['Food', 'Travel', 'Fashion', 'Fitness', 'Tech', 'Lifestyle', 'Beauty']
  }],
  engagementRate: { type: Number },
  avgViews: { type: Number },
  avgLikes: { type: Number },
  profilePicture: { type: String },
  portfolioPhotos: [portfolioPhotoSchema],
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('InfluencerProfile', influencerProfileSchema)