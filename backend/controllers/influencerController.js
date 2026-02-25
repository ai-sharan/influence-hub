const InfluencerProfile = require('../models/InfluencerProfile')

// CREATE INFLUENCER PROFILE
const createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existing = await InfluencerProfile.findOne({ user: req.user.userId })
    if (existing) {
      return res.status(400).json({ message: 'Profile already exists' })
    }

    const {
      city,
      instagramHandle,
      followerRange,
      niche,
      engagementRate,
      avgViews,
      avgLikes,
      profilePicture,
      portfolioPhotos
    } = req.body

    const profile = await InfluencerProfile.create({
      user: req.user.userId,
      city,
      instagramHandle,
      followerRange,
      niche,
      engagementRate,
      avgViews,
      avgLikes,
      profilePicture,
      portfolioPhotos
    })

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET INFLUENCER PROFILE
const getProfile = async (req, res) => {
  try {
    const profile = await InfluencerProfile.findOne({ user: req.user.userId })
      .populate('user', 'name email')

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.status(200).json({ profile })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { createProfile, getProfile }