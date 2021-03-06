let now = new Date();
let currentTime = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours =
  now.getHours().toString().length < 2 ? "0" + now.getHours() : now.getHours();
let minutes =
  now.getMinutes().toString().length < 2
    ? "0" + now.getMinutes()
    : now.getMinutes();

currentTime.innerHTML = `${day} ${hours}:${minutes}`;

//homework 5

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "c4808f82df6cb22aef0e17867c210521";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "c4808f82df6cb22aef0e17867c210521";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFahrengaitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  celsiusLink.classList.remove("active");
  fahrengaitLink.classList.add("active");
  let fahrengaitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrengaitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  celsiusLink.classList.add("active");
  fahrengaitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrengaitLink = document.querySelector("#fahrengait-link");
fahrengaitLink.addEventListener("click", showFahrengaitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
