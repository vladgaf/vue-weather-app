<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const date = ref(new Date().toISOString().split('T')[0])

const historyData = computed(() => weatherStore.history?.forecast?.forecastday?.[0])
const isLoading = computed(() => weatherStore.loading)

const handleDateChange = () => {
  if (date.value && weatherStore.currentWeather?.location?.name) {
    weatherStore.fetchWeatherHistory(weatherStore.currentWeather.location.name, date.value)
  }
}
</script>

<template>
  <div class="card">
    <h2 class="card-title">Historical Weather</h2>

    <div style="margin-bottom: 1rem">
      <label for="history-date" style="display: block; color: #666; margin-bottom: 0.5rem"
        >Select Date:</label
      >
      <input
        type="date"
        id="history-date"
        v-model="date"
        @change="handleDateChange"
        style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 0.25rem"
      />
    </div>

    <div v-if="isLoading" class="text-center" style="padding: 2rem 0">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading historical data...</p>
    </div>

    <div v-else-if="historyData" style="margin-top: 1rem">
      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem">
        {{
          new Date(historyData.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}
      </h3>

      <div class="flex items-center" style="margin-bottom: 1rem">
        <img
          :src="historyData.day.condition.icon"
          :alt="historyData.day.condition.text"
          style="margin-right: 0.5rem"
        />
        <span style="font-size: 1.125rem">{{ historyData.day.condition.text }}</span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-100 p-4 rounded-lg">
          <p style="color: #666">Average Temp</p>
          <p style="font-size: 1.25rem; font-weight: 600">{{ historyData.day.avgtemp_c }}°C</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p style="color: #666">Max Temp</p>
          <p style="font-size: 1.25rem; font-weight: 600">{{ historyData.day.maxtemp_c }}°C</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p style="color: #666">Min Temp</p>
          <p style="font-size: 1.25rem; font-weight: 600">{{ historyData.day.mintemp_c }}°C</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p style="color: #666">Rain Chance</p>
          <p style="font-size: 1.25rem; font-weight: 600">
            {{ historyData.day.daily_chance_of_rain }}%
          </p>
        </div>
      </div>

      <h4 style="font-size: 1.125rem; font-weight: 600; margin: 1.5rem 0 0.5rem">Hourly Data</h4>
      <div class="overflow-x-auto">
        <table style="width: 100%; background-color: white; min-width: 600px">
          <thead>
            <tr style="background-color: #f3f4f6">
              <th style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">Time</th>
              <th style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">Temp (°C)</th>
              <th style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">Condition</th>
              <th style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">Wind (km/h)</th>
              <th style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="hour in historyData.hour"
              :key="hour.time"
              style="border-bottom: 1px solid #e5e7eb"
            >
              <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">
                {{ hour.time.split(' ')[1] }}
              </td>
              <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">{{ hour.temp_c }}</td>
              <td
                style="
                  padding: 0.5rem 1rem;
                  border: 1px solid #e5e7eb;
                  display: flex;
                  align-items: center;
                "
              >
                <img
                  :src="hour.condition.icon"
                  :alt="hour.condition.text"
                  style="margin-right: 0.25rem; width: 1.5rem; height: 1.5rem"
                />
                {{ hour.condition.text }}
              </td>
              <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">{{ hour.wind_kph }}</td>
              <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb">{{ hour.humidity }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
