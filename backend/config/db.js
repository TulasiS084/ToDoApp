const mongoose = require('mongoose');
const dns = require('dns');

// Use a reliable public DNS resolver for SRV lookups in restricted environments
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
