const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeatherData = async (city, units = 'metric') => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
  );
  return res.json();
};

const getForecast = async (lat, lon, units = 'metric') => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`
  );
  return res.json();
};

export { getWeatherData, getForecast };
