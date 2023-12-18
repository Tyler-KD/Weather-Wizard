console.log("This is working!")
// Variable for API Key that can be reused in code without having to type it repeatedly
var APIKey = "bf2f5ecc787085a6aa0763fa9d92df94";

var searchButton = $(".btn");
var inputCityEl = $("#inputCity");
var fiveDayForecastEl = $(".fiveDayForecast");
var weatherIconEl = $(".weather-icon");

var recentlySearchedCities = [];
var recentSearchHistoryEl = $("#recentSearchHistory")



