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
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
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