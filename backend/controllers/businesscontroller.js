const BusinessProfile = require('../models/BusinessProfile')

// CREATE BUSINESS PROFILE
const createProfile = async (req, res) => {
  try {
    const existing = await BusinessProfile.findOne({ user: req.user.userId })
    if (existing) {
      return res.status(400).json({ message: 'Profile already exists' })
    }

    const { businessName, industryType, city, description, businessPhotos } = req.body

    const profile = await BusinessProfile.create({
      user: req.user.userId,
      businessName,
      industryType,
      city,
      description,
      businessPhotos
    })

    res.status(201).json({
      message: 'Business profile created successfully',
      profile
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET BUSINESS PROFILE
const getProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ user: req.user.userId })
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