const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/influencehub',)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error:', err));

app.get('/', (req, res) => {
  res.send('Influence Hub API is running');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});