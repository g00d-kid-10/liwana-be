const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set up the MongoDB connection
    await mongoose.connect(process.env.DATABASE_URI.toString(), {
      dbName: 'liwana-dev'
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
