const mongoose = require('mongoose');
const connectionUrl = 'mongodb://localhost:27017/inotebook';

const connectToDB = async () => {
    try {
      await mongoose.connect(connectionUrl);
      console.log('Successfully connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
  }

module.exports = connectToDB