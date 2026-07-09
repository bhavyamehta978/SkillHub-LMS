const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://bhavyamehta978_db_user:Bodbardier252@cluster0.28mrkpc.mongodb.net/skillhub_lms?appName=Cluster0";

async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas with Mongoose!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectToMongo };