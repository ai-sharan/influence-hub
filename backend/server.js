const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();

app.use(cors());
app.use(express.json());

//connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Influence Hub API is running ');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});