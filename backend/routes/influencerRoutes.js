const express = require('express')
const router = express.Router()
const { createProfile, getProfile } = require('../controllers/influencerController')
const { protect } = require('../middleware/authMiddleware')

router.post('/profile', protect, createProfile)
router.get('/profile', protect, getProfile)

module.exports = router