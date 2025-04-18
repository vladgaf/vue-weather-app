<script setup>
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const searchQuery = ref('')
const isEmptySearch = ref(false)

const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    isEmptySearch.value = true
    return
  }

  isEmptySearch.value = false
  weatherStore.fetchWeather(searchQuery.value.trim())
}

const handleGeoSearch = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      weatherStore.fetchByLocation(position.coords.latitude, position.coords.longitude)
    },
    (error) => {
      console.log(error.message)
    },
  )
}
</script>

<template>
  <div class="search-container">
    <div class="search-form">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Введите название города..."
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">Поиск</button>
      <button @click="handleGeoSearch" class="search-button">
        Использовать моё местоположение
      </button>
    </div>

    <div v-if="isEmptySearch" class="error-message">Пожалуйста, введите название города</div>

    <div v-if="weatherStore.error" class="error-message">
      {{ weatherStore.error }}
    </div>
  </div>
</template>
