const weatherapi_key = "fd680c2b2e864e6f9e1123857231808";
const imgapi_key = "QXlir97Pvx6eDvsD3p4NqWt2e8xlfnHt-NT00pavBnk";
const bg = document.querySelector("#bg-img");
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
    `https://api.weatherapi.com/v1/current.json?key=${weatherapi_key}&q=${city}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  handleDisplay(weatherData);
  getBG(`${weatherData.location.name.split().join("-")}`);
}

async function getBG(loc) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${loc}&per_page=20&client_id=${imgapi_key}`,
    { mode: "cors" }
  );
  const imgData = await response.json();
  bg.style.backgroundImage = `url(${imgData.results[0].urls.regular})`;
}

// calls async function when user searches for a location
form.addEventListener("submit", () => {
  const city = form.elements["city"].value.split().join("-");
  getWeather(city);
});

// placeholder at start of website load
getWeather("Tokyo");
