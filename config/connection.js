const mongoose = require('mongoose');
require('dotenv').config()

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mist_ai', )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));   