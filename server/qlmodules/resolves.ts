import fetch from 'cross-fetch';
import { weatherAPI } from '../global';

const getGeocodeData = async (city: string) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherAPI}`);
  const geoCodeData =  await response.json();

  return geoCodeData[0];
}

const getWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`);
  const weatherData = await response.json();

  const formattedWeatherData = {
    shortDesc: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    temp: weatherData.main.temp,
  }

  return formattedWeatherData;
}

export {
  getGeocodeData,
  getWeatherData,
}