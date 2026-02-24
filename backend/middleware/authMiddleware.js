const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  try {
    // Get token from request header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Access denied.' })
    }

    // Extract token
    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user info to request
    req.user = decoded

    next()

  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = { protect }