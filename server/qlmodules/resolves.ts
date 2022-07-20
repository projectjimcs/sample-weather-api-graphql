import fetch from 'cross-fetch';
import { weatherAPI } from '../global';
import bcrypt from 'bcrypt';
import { connection } from '../config/dbconfig';
import { OkPacket } from 'mysql';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../global';

// !!! Good idea here to separate/group the resolves into their own folder
const getWeatherData = async (city: string) => {
  // Possibly good idea here to extract getting geocode data into another function,
  // but as it wouldn't be used anywhere else in this code, maybe more readable as is
  const geoDataResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherAPI}`);
  const geoCodeData =  await geoDataResponse.json();

  const lat: number = geoCodeData[0].lat;
  const lon: number = geoCodeData[0].lon;

  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`);
  const weatherData = await weatherResponse.json();

  const formattedWeatherData = {
    shortDesc: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    temp: weatherData.main.temp,
  }

  return formattedWeatherData;
}

const addUser = async (username: string, password: string) => {
  const existingUser: [] = await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  if (existingUser.length) {
      throw new Error('User already exists');
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const query: OkPacket = await new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  return {
    id: query.insertId,
  }
}

const login = async (username: string, password: string) => {
  // In a larger project these should probably be kept in one place
  interface UserData {
    id: number;
    username: string;
    password: string;
  }

  const foundUser: [UserData] = await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  if (!foundUser.length) {
    throw new Error('User not found');
  }

  const isCorrectPassword = await bcrypt.compare(password, foundUser[0].password);

  if (!isCorrectPassword) {
    throw new Error('Invalid Credentials');
  }

  const token = jwt.sign({ userId: foundUser[0].id }, jwtSecret as string, {
    expiresIn: '1h',
  });

  return {
    userId: foundUser[0].id,
    token: token,
    tokenExpiry: 1,
  }
}

export {
  getWeatherData,
  addUser,
  login,
}