<script setup>
import SearchBar from '@/components/SearchBar.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import Forecast from '@/components/Forecast.vue'
import History from '@/components/History.vue'
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'

const weatherStore = useWeatherStore()
const hasData = computed(() => weatherStore.currentWeather !== null)
</script>

<template>
  <div class="container">
    <h1>Weather App</h1>

    <SearchBar />

    <div v-if="!hasData" class="welcome-message">
      <p>Enter a city name to see current weather and forecast</p>
    </div>

    <CurrentWeather v-if="hasData" />
    <Forecast v-if="hasData" />
    <History v-if="hasData" />
  </div>
</template>
