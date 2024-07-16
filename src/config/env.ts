import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || ''
};
