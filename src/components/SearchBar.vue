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
      <button @click="handleGeoSearch" class="search-button" :disabled="weatherStore.loading">
        <template v-if="weatherStore.loading">
          <div class="loading-spinner"></div>
        </template>
        <template v-else>
          <div class="icon-holder">
            <svg style="color: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"
                fill="white"
              ></path>
            </svg>
          </div>
        </template>
      </button>
    </div>

    <div v-if="isEmptySearch" class="error-message">Пожалуйста, введите название города</div>

    <div v-if="weatherStore.error" class="error-message">
      {{ weatherStore.error }}
    </div>
  </div>
</template>
