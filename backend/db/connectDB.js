// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';


// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables,
    // or default to a local MongoDB instance if not provided

    // Use the correct environment variable for MongoDB URI
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017';
    if (!mongoUri) {
      throw new Error('MongoDB connection string is not defined in environment variables.');
    }
    const conn = await mongoose.connect(mongoUri);

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Listen for connection errors and log them
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Listen for disconnection events and log them
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle app termination (Ctrl+C) and close the MongoDB connection gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    // Log connection failure and exit the process
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};


// Export the connectDB function for use in other parts of the application
export default connectDB;
