function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  // Extract data from the response
  let temperature = response.data.temperature.current;
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;

  // Update the DOM elements
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(new Date(response.data.time * 1000));
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${iconUrl}" alt="${description}" class="weather-app-icon" />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "et401e0250aoba810790ea9f9af94f03";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch((error) => {
      alert("City not found. Please try another city.");
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  if (searchInput.value) {
    searchCity(searchInput.value.trim());
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city
searchCity("Paris");
