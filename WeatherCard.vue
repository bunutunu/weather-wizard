<template>
  <div class="card">
    <h2>{{ data.name }}</h2>
    <img :src="iconUrl" :alt="data.weather[0].description" />
    <p>{{ Math.round(data.main.temp) }}°{{ units === 'metric' ? 'C' : 'F' }}</p>
    <p>{{ data.weather[0].main }}</p>
  </div>
</template>

<script setup>
defineProps(['data', 'units']);
const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
</script>

<style scoped>
.card {
  text-align: center;
  margin-top: 1rem;
}
</style>
