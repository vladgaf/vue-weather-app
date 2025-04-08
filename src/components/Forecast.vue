<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const forecastData = computed(() => weatherStore.forecast?.forecast?.forecastday)
const isLoading = computed(() => weatherStore.loading)
</script>

<template>
  <div v-if="isLoading" class="text-center" style="padding: 2rem 0">
    <div class="loading-spinner"></div>
    <p class="loading-text">Loading forecast data...</p>
  </div>

  <div v-else-if="forecastData" class="card">
    <h2 class="card-title">3-Day Forecast</h2>

    <div class="forecast">
      <div v-for="day in forecastData" :key="day.date" class="forecastItem">
        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem">
          {{ new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }) }}
        </h3>
        <p style="color: #666; margin-bottom: 0.5rem">{{ day.date }}</p>
        <div class="forecast-condition" style="margin-bottom: 0.5rem">
          <img
            :src="day.day.condition.icon"
            :alt="day.day.condition.text"
            style="margin-right: 0.5rem"
          />
          <span>{{ day.day.condition.text }}</span>
        </div>
        <div class="forecast-info">
          <div>
            <p style="color: #666">Max</p>
            <p style="font-size: 1.25rem; font-weight: 600">{{ day.day.maxtemp_c }}°C</p>
          </div>
          <div>
            <p style="color: #666">Min</p>
            <p style="font-size: 1.25rem; font-weight: 600">{{ day.day.mintemp_c }}°C</p>
          </div>
          <div>
            <p style="color: #666">Rain</p>
            <p style="font-size: 1.25rem; font-weight: 600">{{ day.day.daily_chance_of_rain }}%</p>
          </div>
          <div>
            <p style="color: #666">Wind</p>
            <p style="font-size: 1.25rem; font-weight: 600">{{ day.day.maxwind_kph }} km/h</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
