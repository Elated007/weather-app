const inputBox = document.querySelector(".input-box");
const searchButton = document.querySelector(".search-box img"); // Corrected selector
const weather_img = document.querySelector(".weather-image"); // Corrected class name
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "3f3dea1dc1b84f219da2a8156d2606eb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; // Corrected string interpolation

  const weather_data = await fetch(url).then((response) => response.json());

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;

  wind_speed.innerHTML = `${weather_data.main.wind_speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Broken_Cloud":
      weather_img.src = "assets/images/cloudy.png";
      break;
    case "Clear_Sky":
      weather_img.src = "/assets/images/clear-sky.png";
      break;
    case "Rain":
      weather_img.src = "/assets/images/rain.png";
      break;
    case "Mist":
      weather_img.src = "/assets/images/haze.png";
      break;
    case "Snow":
      weather_img.src = "/assets/images/snowy.png";
      break;
  }
  console.log(weather_data);
}

searchButton.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
