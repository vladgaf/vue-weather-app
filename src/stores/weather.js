import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCurrentWeather, fetchForecast, fetchHistory } from '@/api/weather'
import { fetchGeolocation } from '@/api/geocoding'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const forecast = ref(null)
  const history = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const location = ref(null)

  const fetchWeather = async (city) => {
    try {
      loading.value = true
      error.value = null
      currentWeather.value = await fetchCurrentWeather(city)
      forecast.value = await fetchForecast(city)
      //location.value = await fetchGeolocation(city)
    } catch (err) {
      error.value = err.message || 'Failed to fetch weather data'
    } finally {
      loading.value = false
    }
  }

  const fetchWeatherHistory = async (city, date) => {
    try {
      loading.value = true
      error.value = null
      history.value = await fetchHistory(city, date)
    } catch (err) {
      error.value = err.message || 'Failed to fetch weather history'
    } finally {
      loading.value = false
    }
  }

  return {
    currentWeather,
    forecast,
    history,
    loading,
    error,
    fetchWeather,
    fetchWeatherHistory,
  }
})
