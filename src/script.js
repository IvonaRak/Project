let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[time.getDay()];
let hour = time.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${hour}:${minutes}`;

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "c8c1bbf165535524c84388bd994011cb";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "c8c1bbf165535524c84388bd994011cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function findMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let findMyLocation = document.querySelector("#my-location-button");
findMyLocation.addEventListener("click", findMyLocation);

let searchForm = document.querySelector("#engine");
searchForm.addEventListener("submit", handleSubmit);
let gpsLocationButton = document.querySelector("#my-location-button");
gpsLocationButton.addEventListener("click", findMyLocation);
