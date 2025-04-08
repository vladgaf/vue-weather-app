<script setup>
import { computed } from 'vue'
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const weatherData = computed(() => weatherStore.currentWeather)
const isLoading = computed(() => weatherStore.loading)
</script>

<template>
  <div v-if="isLoading" class="loading-spinner"></div>

  <div v-else-if="weatherData">
    <!-- <VMap
      v-if="!isLoading"
      style="height: 200px; border: 10px solid red; position: relative"
      :center="weatherData.location"
      :zoom="10"
    >
      <VMapOsmTileLayer />
      <VMapZoomControl />
    </VMap> -->
    <div class="weather-card current">
      <div class="weather-info">
        <div class="current-weather">
          <div>
            <h3>{{ weatherData.location.name }}, {{ weatherData.location.country }}</h3>
            <p>{{ weatherData.location.localtime }}</p>
          </div>
          <div>
            <div class="temp-holder">
              <div style="font-size: 2rem; font-weight: bold">
                {{ weatherData.current.temp_c }}°C
              </div>
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
  </div>
  <div class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 300px;
  height: 200px;
  position: relative; /* Важно для корректного позиционирования карты */
  border-radius: 15px;
  overflow: hidden; /* Чтобы скругленные углы работали */
}

.weather-map {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
