console.log("This is working!")
// Variable for API Key that can be reused in code without having to type it repeatedly
var apiKey = "bf2f5ecc787085a6aa0763fa9d92df94";

var searchButton = $(".btn");
var inputCityEl = document.querySelector("#inputCity");
var fiveDayForecastEl = $(".fiveDayForecast");
var fiveDayWeatherIconEl = $("5DayIcon");
var currentWeatherIconEl = $(".currentWeatherIcon");
var citySearchEl = document.getElementById("citySearch");
var recentlySearchedCities = [];
var recentSearchHistoryEl = $("#recentSearchHistory")

var SearchedGet = localStorage.getItem("City Name");
if (SearchedGet !== null) {
    recentlySearchedCities = JSON.parse(SearchedGet);
    console.log(recentlySearchedCities);
}
displaySearchedCities();

function getWeather(city) {
    city = (city || inputCityEl.value).trim();
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data && data.name && data.weather[0].icon && data.main.temp && data.wind.speed && data.main.humidity) {


                console.log("name", data.name);
                console.log("date", data.dt);
                console.log("icon", data.weather[0].icon);
                console.log("temp", data.main.temp);
                console.log("wind speed", data.wind.speed);
                console.log("humidity", data.main.humidity);
                $("#city").text(`${data.name}`);
                $("#date").text(`${moment().format("L")}`);

                var currentWeatherIconEl = document.createElement("img");
                currentWeatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                currentWeatherIconEl.setAttribute("alt", `Weather Icon`);
                currentWeatherIconEl.setAttribute("class", "currentWeatherIcon");
                currentWeatherIconEl.setAttribute("width", "100");
                currentWeatherIconEl.setAttribute("height", "100");
                $("#weather-conditions-icon").empty().append(currentWeatherIconEl);

                $("#temp").text(`Temp: ${data.main.temp} ºF`);
                $("#humidity").text(`Humidity: ${data.main.humidity} %`);
                $("#wind").text(`Wind: ${data.wind.speed} mph`);

                if (!recentlySearchedCities.includes(city)) {
                    recentlySearchedCities.push(city);
                }
                count = 0;
                // if array is too long, cut it down if higher than specifized number, splice method
                localStorage.setItem("City Name", JSON.stringify(recentlySearchedCities));
                displaySearchedCities();
            } else {
                console.error("Invalid data received from the API");
            }
        })
};

citySearchEl.addEventListener("click", (event) => {
    event.preventDefault();
    getWeather();
    get5Day();
});

function generateCard(apiData) {
    var index = 0
    for (let j = 1; j < apiData.length; j = j + 8) {

        $(`#day-${index}-date`).text(`Date: ${moment().add(index + 1, "days").format("L")}`);
        var FiveiconEl = document.createElement("img");
        var FiveiconCode = (`${apiData[j].weather[0].icon}`);
        var FiveiconUrl = ("https://openweathermap.org/img/wn/" + FiveiconCode + ".png");
        FiveiconEl.setAttribute("src", FiveiconUrl);
        $(`#day-${index}-icon`).empty().append(FiveiconEl);
        $(`#day-${index}-temp`).text(`Temp: ${apiData[j].main.temp} ºF`);
        $(`#day-${index}-wind`).text(`Wind: ${apiData[j].wind.speed} mph`);
        $(`#day-${index}-humidity`).text(`Humidity: ${apiData[j].main.humidity} %`);

        index += 1
    }
};

function get5Day(city) {
    city = (city || inputCityEl.value).trim();
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    )
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            generateCard(data.list);
        })
};


function displaySearchedCities() {
    recentSearchHistoryEl.empty();
    for (var i = 0; i < recentlySearchedCities.length; i++) {
        var listBtn = $(`
        <li>
        <button type="button" data-city="new-york" class="btnCity";>
        ${recentlySearchedCities[i]}
        </button>
        </li>`);
        recentSearchHistoryEl.append(listBtn);

        if (recentlySearchedCities.length > 10) {
            recentlySearchedCities.splice(i, 1);
        }
    }
};

recentSearchHistoryEl.on("click", "button", function () {
    console.log($(this).text());
    var city = $(this).text();
    getWeather(city);
    get5Day(city);
});