import mongoose from 'mongoose';
import { ENV } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
