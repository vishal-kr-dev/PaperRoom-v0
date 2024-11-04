import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    
    console.log(`Connection error ${error}`);
  }
};

export default ConnectDB
