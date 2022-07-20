import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const weatherAPI = process.env.WEATHER_API_KEY;

export {
  port,
  weatherAPI,
}