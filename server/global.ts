import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const weatherAPI = process.env.WEATHER_API_KEY;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

export {
  port,
  weatherAPI,
  dbUser,
  dbPassword,
  jwtSecret,
}