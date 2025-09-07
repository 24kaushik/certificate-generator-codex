import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// Cached connection object
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // If a connection is already established, return it
    return cached.conn;
  }

  if (!cached.promise) {
    // If no promise exists, create one
    const opts = {
      bufferCommands: false, // Recommended for serverless
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return mongoose;
    }).catch(error => {
      console.error(`Error: ${error.message}`);
      cached.promise = null; // Clear promise on error
      throw error;
    });
  }

  // Await the connection promise
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;