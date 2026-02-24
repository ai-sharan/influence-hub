const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();

app.use(cors());
app.use(express.json());

//connect to MongoDB
connectDB();

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const { protect } = require('./middleware/authMiddleware')

app.get('/api/test-protected', protect, (req, res) => {
  res.json({ 
    message: 'You have access to this protected route',
    user: req.user 
  })
})

app.get('/', (req, res) => {
  res.send('Influence Hub API is running ');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});