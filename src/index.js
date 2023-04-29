
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${day} ${hours}:${minutes}`;
  }


let apiKey = "cb66bf594bf675942f1ebbf913157ef9";

function manipulation(response) {
  let cityHolder = document.querySelector(".cityName");
  let weatherHolder = document.querySelector("#weather");
  let tempHolder = document.querySelector("#temperature");
  let windHolder = document.querySelector("#Wind");
  let humidityHolder = document.querySelector("#Humidity");
  let dateHolder = document.querySelector(".time");
  let iconHolder = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  let temp = Math.round(response.data.main.temp);
  // console.log(response.data);
  // console.log(response.data.name);
  cityHolder.innerHTML = `<strong> ${response.data.name} </strong>`;
  tempHolder.innerHTML = `<strong> ${temp} </strong>`;
  weatherHolder.innerHTML = `${response.data.weather[0].description}`;
  windHolder.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidityHolder.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  dateHolder.innerHTML = `Last Updated: ${formatDate(response.data.dt * 1000)}`;
  iconHolder.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconHolder.setAttribute("alt", response.data.weather[0].description);

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

// function getCurrent(event) {
//   event.preventDefault();
//   function current(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     console.log(lat, lon);
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//     axios.get(url).then(showTemprature);
//   }
//   navigator.geolocation.getCurrentPosition(current);
// }

// currentElement.addEventListener("click", getCurrent);

let city = "tehran";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(url).then(defaultCity);

function defaultCity(response) {
  manipulation(response);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

