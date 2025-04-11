<script setup>
import { computed } from 'vue'
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const weatherData = computed(() => weatherStore.currentWeather)
const weatherCoords = computed(() => weatherStore.location)
const isLoading = computed(() => weatherStore.loading)
</script>

<template>
  <div v-if="isLoading" class="loading-spinner"></div>
  <div v-else-if="weatherData" class="weather-card current">
    <div class="weather-info">
      <div class="current-weather">
        <div>
          <a :href="weatherCoords">
            <h3>{{ weatherData.location.name }}, {{ weatherData.location.country }}</h3>
          </a>
          <p>{{ weatherData.location.localtime }}</p>
        </div>
        <div>
          <div class="temp-holder">
            <div style="font-size: 2rem; font-weight: bold">{{ weatherData.current.temp_c }}°C</div>
            <img
              :src="weatherData.current.condition.icon"
              :alt="weatherData.current.condition.text"
            />
          </div>
          <div class="condition">
            <p>{{ weatherData.current.condition.text }}</p>
          </div>
        </div>
      </div>

      <div class="weather-details">
        <div class="weather-detail">
          <p class="secondary-title">Feels Like</p>
          <p style="font-weight: bold">{{ weatherData.current.feelslike_c }}°C</p>
        </div>
        <div class="weather-detail">
          <p class="secondary-title">Humidity</p>
          <p style="font-weight: bold">{{ weatherData.current.humidity }}%</p>
        </div>
        <div class="weather-detail">
          <p class="secondary-title">Wind</p>
          <p style="font-weight: bold">{{ weatherData.current.wind_kph }} km/h</p>
        </div>
        <div class="weather-detail">
          <p class="secondary-title">Pressure</p>
          <p style="font-weight: bold">{{ weatherData.current.pressure_mb }} mb</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
