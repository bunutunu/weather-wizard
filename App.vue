<template>
  <div :style="{ backgroundImage: `url(/images/${background})` }" class="app">
    <div class="container">
      <input v-model="city" @keyup.enter="fetchWeather" placeholder="Enter city" />
      <button @click="getLocation">📍 Use My Location</button>
      <select v-model="units" @change="fetchWeather">
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>
      <WeatherCard v-if="weather" :data="weather" :units="units" />
      <Forecast v-if="forecast" :data="forecast.daily" :units="units" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getWeatherData, getForecast } from './services/weatherService';
import WeatherCard from './components/WeatherCard.vue';
import Forecast from './components/Forecast.vue';
import backgrounds from './assets/weather-backgrounds';

const city = ref('Hanoi');
const weather = ref(null);
const forecast = ref(null);
const units = ref('metric');
const background = ref('sunny.jpg');

const fetchWeather = async () => {
  weather.value = await getWeatherData(city.value, units.value);
  background.value = backgrounds[weather.value.weather[0].main] || 'sunny.jpg';
  forecast.value = await getForecast(weather.value.coord.lat, weather.value.coord.lon, units.value);
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=${units.value}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    );
    weather.value = await res.json();
    city.value = weather.value.name;
    background.value = backgrounds[weather.value.weather[0].main] || 'sunny.jpg';
    forecast.value = await getForecast(coords.latitude, coords.longitude, units.value);
  });
};

watch(city, () => fetchWeather());

fetchWeather();
</script>

<style>
.app {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  color: white;
}
.container {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: auto;
}
input, select, button {
  margin: 0.5rem;
}
</style>
