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
        console.log("name", data.name);
        console.log("weather", data.weather[0]);
        console.log("icon", data.weather[0].icon);
        console.log("temp", data.main.temp);
        console.log("wind speed", data.wind.speed);
        console.log("humidity", data.main.humidity);
        // $("#city").text(
        // `City: ${data.main.name} (${moment().format("M/D/YYYY")})`);
        $("#city").text(`${data.name}`);
        $("#weather-conditions-icon").text(`${data.weather[0].icon}`);
        $("#temp").text(`Temp: ${data.main.temp} ºF`);
        $("#humidity").text(`Humidity: ${data.main.humidity} %`);
        $("#wind").text(`Wind: ${data.wind.speed} mph`);
        
    })
}
citySearchEl.addEventListener("click", (event) => {
    event.preventDefault();
    getWeather();
});