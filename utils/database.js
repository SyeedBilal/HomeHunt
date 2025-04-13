const mongoose = require('mongoose');

// MongoDB connection URI for Home Hunt app (using airbnb database)
const DB_URI = "mongodb+srv://syeedbilalkirmaney:Programming.in1@mongodbairbnb.wik5q.mongodb.net/airbnb?retryWrites=true&w=majority&appName=MONGODBAIRBNB";

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectToDatabase };