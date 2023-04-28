let dateValue = document.querySelector(".time");

let now = new Date();

var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = dayNames[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
dateValue.innerHTML = `${day} ${hours}:${minutes}`;
let apiKey = "cb66bf594bf675942f1ebbf913157ef9";

function manipulation(response) {
  let cityHolder = document.querySelector(".cityName");
  let weatherHolder = document.querySelector("#weather");
  let tempHolder = document.querySelector("#degree");
  let windHolder = document.querySelector("#Wind");
  let humidityHolder = document.querySelector("#Humidity");

  let temp = Math.round(response.data.main.temp);
  console.log(response.data);
  console.log(temp);
  cityHolder.innerHTML = `<strong> ${response.data.name} </strong>`;
  tempHolder.innerHTML = `<strong> ${temp}°c </strong>`;
  weatherHolder.innerHTML = `${response.data.weather[0].main}`;
  windHolder.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidityHolder.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

let searchElement = document.querySelector(".weatherSearch");

function search(event) {
  event.preventDefault();
  let city = document.querySelector(".weatherInput").value;
  console.log(city);
  if (city === "") {
    alert("Please Enter a City Name");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemprature);
  }
}

searchElement.addEventListener("click", search);

function showTemprature(response) {
  manipulation(response);
}

let currentElement = document.querySelector(".currentLocation");

function getCurrent(event) {
  event.preventDefault();
  function current(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat, lon);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemprature);
  }
  navigator.geolocation.getCurrentPosition(current);
}

currentElement.addEventListener("click", getCurrent);

let city = "tehran";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(url).then(defaultCity);

function defaultCity(response) {
  manipulation(response);
}
