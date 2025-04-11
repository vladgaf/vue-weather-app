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
  <div class="card-history">
    <h2 class="card-title">Historical Weather</h2>

    <div class="input-container">
      <label for="history-date" class="input-label">Select Date:</label>
      <input
        type="date"
        id="history-date"
        v-model="date"
        @change="handleDateChange"
        class="date-input"
      />
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading historical data...</p>
    </div>

    <div v-else-if="historyData" class="history-content">
      <div class="weather-condition-holder">
        <h3 class="history-date">
          {{
            new Date(historyData.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </h3>
        <div class="weather-condition">
          <img
            :src="historyData.day.condition.icon"
            :alt="historyData.day.condition.text"
            class="weather-icon"
          />
          <span class="weather-text">{{ historyData.day.condition.text }}</span>
        </div>
      </div>

      <div class="weather-grid">
        <div class="weather-card">
          <p class="weather-card-label">Average Temp</p>
          <p class="weather-card-value">{{ historyData.day.avgtemp_c }}°C</p>
        </div>
        <div class="weather-card">
          <p class="weather-card-label">Max Temp</p>
          <p class="weather-card-value">{{ historyData.day.maxtemp_c }}°C</p>
        </div>
        <div class="weather-card">
          <p class="weather-card-label">Min Temp</p>
          <p class="weather-card-value">{{ historyData.day.mintemp_c }}°C</p>
        </div>
        <div class="weather-card">
          <p class="weather-card-label">Rain Chance</p>
          <p class="weather-card-value">{{ historyData.day.daily_chance_of_rain }}%</p>
        </div>
      </div>

      <h4 class="hourly-title">Hourly Data</h4>
      <div class="table-container">
        <table class="hourly-table">
          <thead>
            <tr class="table-header-row">
              <th class="table-header-cell">Time</th>
              <th class="table-header-cell">Temp (°C)</th>
              <th class="table-header-cell">Condition</th>
              <th class="table-header-cell">Wind (km/h)</th>
              <th class="table-header-cell">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hour in historyData.hour" :key="hour.time" class="table-row">
              <td class="table-cell">{{ hour.time.split(' ')[1] }}</td>
              <td class="table-cell">{{ hour.temp_c }}</td>
              <td class="table-cell condition-cell">
                <img :src="hour.condition.icon" :alt="hour.condition.text" class="hourly-icon" />
                {{ hour.condition.text }}
              </td>
              <td class="table-cell">{{ hour.wind_kph }}</td>
              <td class="table-cell">{{ hour.humidity }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.card-history {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex-shrink: 2;
}

.input-container {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
}

.date-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.loading-container {
  padding: 2rem 0;
  text-align: center;
}

/* Стили для исторических данных */
.history-content {
  margin-top: 1rem;
}

.history-date {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.weather-condition-holder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.weather-condition {
  display: flex;
  align-items: center;
}

.weather-icon {
  margin-right: 0.5rem;
}

.weather-text {
  font-size: 1.125rem;
}

/* Стили для сетки погодных данных */
.weather-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .weather-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.weather-card {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
}

.weather-card-label {
  color: #666;
  margin-bottom: 0.5rem;
}

.weather-card-value {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Стили для таблицы почасовых данных */
.hourly-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.table-container {
  overflow-x: auto;
}

.hourly-table {
  width: 100%;
  background-color: white;
  min-width: 600px;
  border-collapse: collapse;
}

.table-header-row {
  background-color: #f3f4f6;
}

.table-header-cell {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
}

.table-cell {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
}

.condition-cell {
  display: flex;
  align-items: center;
}

.hourly-icon {
  margin-right: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
