const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiry
    })

    // Send verification email
    const verificationLink = `http://localhost:8000/api/auth/verify/${verificationToken}`

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your Influence Hub account',
      html: `
        <h2>Welcome to Influence Hub</h2>
        <p>Click the link below to verify your email address.</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `
    })

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.'
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  try {
    // Get token from URL
    const { token } = req.params

    // Find user with this token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    })

    // If no user found or token expired
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification link' })
    }

    // Mark user as verified and clear token
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiry = undefined
    await user.save()

    res.status(200).json({ message: 'Email verified successfully. You can now login.' })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const jwt = require('jsonwebtoken')

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { register, verifyEmail, login }