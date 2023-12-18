console.log("This is working!")
// Variable for API Key that can be reused in code without having to type it repeatedly
var apiKey = "bf2f5ecc787085a6aa0763fa9d92df94";

var searchButton = $(".btn");
var inputCityEl = document.getElementById("inputCity");
var fiveDayForecastEl = $(".fiveDayForecast");
var weatherIconEl = $(".weather-icon");
var citySearchEl = document.getElementById("citySearch");
var recentlySearchedCities = [];
var recentSearchHistoryEl = $("#recentSearchHistory")

function getWeather () {
    city = inputCityEl.value;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    })
}
citySearchEl.addEventListener("click", (event) => {
    event.preventDefault();
    getWeather();
});

function getWeatherData(city) {
    getApi(city).then(function (data) {
      console.log(data);
  
      // current city weather data
      $("#city").text(
        `City: ${weather.main.name} (${moment().format("M/D/YYYY")})`
      );
      $("#temp").text(`Temp: ${weather.main.temp} ºF`);
      $("#wind").text(`Wind: ${weather.main.speed} mph`);
      $("#humidity").text(`Humidity: ${weather.main.humidity} %`);})}

      getWeatherData()