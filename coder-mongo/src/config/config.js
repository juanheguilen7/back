import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGO_URL, "estoy en env");

export default {
  MONGO_URL: process.env.MONGO_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};
