const api_key = "fd680c2b2e864e6f9e1123857231808";
const form = document.querySelector("form");
const city_name = document.querySelector(".city");
const country = document.querySelector(".country");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");

async function getWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);

  city_name.textContent = weatherData.location.name;
  country.textContent = weatherData.location.country;
  temp.textContent = weatherData.current.feelslike_c;
  condition.textContent = weatherData.current.condition.text;
}

form.addEventListener("submit", () => {
  const city = form.elements["city"].value.split().join("-");
  getWeather(city);
});