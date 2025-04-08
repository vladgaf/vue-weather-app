import axios from 'axios'
import config from '@/config.json'

const API_KEY = config.weatherApiKey
const BASE_URL = 'https://api.weatherapi.com/v1'

export const fetchCurrentWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/current.json`, {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'no',
    },
  })
  return response.data
}

export const fetchForecast = async (city, days = 3) => {
  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: city,
      days: days,
      aqi: 'no',
      alerts: 'no',
    },
  })
  return response.data
}

export const fetchHistory = async (city, date) => {
  const response = await axios.get(`${BASE_URL}/history.json`, {
    params: {
      key: API_KEY,
      q: city,
      dt: date,
      aqi: 'no',
    },
  })
  return response.data
}
