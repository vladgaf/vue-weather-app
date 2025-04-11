import axios from 'axios'
import config from '@/config.json'

const API_KEY = config.geocodeApiKey
const BASE_URL = 'https://api.geoapify.com/v1'

export const fetchGeolocation = async (query) => {
  const response = await axios.get(`${BASE_URL}/geocode/search`, {
    params: {
      apiKey: API_KEY,
      text: query,
    },
  })

  console.log(response.data)

  const { lat, lon } = response.data.features[0].properties
  // Для карты
  // return [lat, lon]

  // Для ссылки на Google Maps
  var url = `https://www.google.com/maps/place/${lat},${lon}`
  console.log(url)
  return url
}
