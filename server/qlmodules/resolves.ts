import fetch from 'cross-fetch';
import { weatherAPI } from '../global';
import bcrypt from 'bcrypt';
import { connection } from '../config/dbconfig';
import { OkPacket } from 'mysql';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../global';
import { Request, Response } from 'express';

interface UserData {
  id: number;
  username: string;
  password: string;
}

interface DecodedToken {
  userId: string;
  token: string,
}

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

const login = async (username: string, password: string, res: Response) => {
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

  res.cookie('token', token, {httpOnly: true});

  return {
    userId: foundUser[0].id,
    token: token,
    tokenExpiry: 1,
  }
}

const validateToken = async (req: Request) => {
  const token = req.headers.cookie?.split('=')[1];

  if (!token) {
    throw new Error('Not signed in');
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret as string) as DecodedToken;

    const foundUser: [UserData] = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', [decodedToken.userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (!foundUser.length) {
      throw new Error('No user found');
    }

    return {
      userId: decodedToken.userId,
      token: token,
    }
  } catch (err) {
    throw new Error('Not signed in');
  }
}

const logout = (context: any) => {
  context.res.clearCookie('token');
  context.req.session.destroy();

  return {
    // Might be a good idea to const the "default" userId
    userId: 0,
    token: '',
  }
}

export {
  getWeatherData,
  addUser,
  login,
  validateToken,
  logout,
}