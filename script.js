const api_key = "fd680c2b2e864e6f9e1123857231808";
const form = document.querySelector("form");
const loc = document.querySelector("#location");
const temp = document.querySelector("#temp");
const condition = document.querySelector("#condition");
const uv = document.querySelector("#uv");
const feels = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind-speed");

// display data on page
const handleDisplay = (data) => {
  loc.textContent = `${data.location.name}, ${data.location.country}`;
  temp.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
  uv.textContent = data.current.uv;
  feels.textContent = `${data.current.feelslike_c}°C`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} kph`;
};

// fetch weather API data
async function getWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  handleDisplay(weatherData);
}

// calls async function when user searches for a location
form.addEventListener("submit", () => {
  const city = form.elements["city"].value.split().join("-");
  getWeather(city);
});

// placeholder at start of website load
getWeather("Tokyo");
