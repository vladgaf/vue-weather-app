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
    </div>

    <div v-if="isEmptySearch" class="error-message">Пожалуйста, введите название города</div>

    <div v-if="weatherStore.error" class="error-message">
      {{ weatherStore.error }}
    </div>
  </div>
</template>
