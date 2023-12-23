// Variable for API Key that can be reused in code without having to type it repeatedly
var apiKey = "bf2f5ecc787085a6aa0763fa9d92df94";
// User's input text for searching cities 
var inputCityEl = document.querySelector("#inputCity");
// Variable for Current Day Forecast icon
var currentWeatherIconEl = $(".currentWeatherIcon");
// Search button
var citySearchEl = document.getElementById("citySearch");
// empty array for recently searched cites
var recentlySearchedCities = [];
// List of recently searched cites
var recentSearchHistoryEl = $("#recentSearchHistory")

// Retrieves recentlySearchedCities value from Key: "City Name"
var SearchedGet = localStorage.getItem("City Name");
if (SearchedGet !== null) {
    recentlySearchedCities = JSON.parse(SearchedGet);
    console.log(recentlySearchedCities);
}
// Call displays Recent Cities everytime page is loaded
displaySearchedCities();

// Function for fetching and displaying Current Day forecast data
// Trimmed leading and trailing spaces from user input to prevent API Request errors
function getWeather(city) {
    city = (city || inputCityEl.value).trim();
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )   
        // If there is a response, then city is converted to JSON for usable data
        .then(function (res) {
            return res.json();
        })
        // Function for applying data from API to city, date, weather icon, wind speed, and humidity elements
        .then(function (data) {           
            console.log("name", data.name);
            console.log("date", data.dt);
            console.log("icon", data.weather[0].icon);
            console.log("temp", data.main.temp);
            console.log("wind speed", data.wind.speed);
            console.log("humidity", data.main.humidity);
            // If there are data, city name, weather icon, temperature, wind speed, and humidity values, then the function runs
            // Adding !==undefined to paramaters allows for 0 values to be read instead of undefined
            if (data.name && data.weather[0].icon && data.main.temp !==undefined && data.wind.speed !==undefined && data.main.humidity !==undefined) {
                // .text method applies stringed data values to id elements
                $("#city").text(`${data.name}`);
                $("#date").text(`${moment().format("L")}`);
                // Variable for created image element
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

                // Conditional to prevent duplicates from displaying in Recent Cities list
                if (!recentlySearchedCities.includes(city.toLowerCase())) {
                    recentlySearchedCities.push(city);
                }
                count = 0;                
                // Key: "City Name" Value: receentlysearchCities
                // Strings the recentlySearchedCities array and saves data to local storage
                localStorage.setItem("City Name", JSON.stringify(recentlySearchedCities));
                // Calls displaySearchedCities function so that recently searched cities are displayed after each user clicks "Search" 
                displaySearchedCities();
            } else {
                console.error("Invalid data received from the API");
            }
        })
};

// Event listener for Search button
// After user click "Search," Current Forecast and 5 Day Forecast functions are called
citySearchEl.addEventListener("click", (event) => {
    event.preventDefault();
    getWeather();
    get5Day();
});

// Function for displaying 5 Day Forecast data
function generateCard(apiData) {
    // Index starts at 0
    var index = 0
    // API returns 40 elements across 5 days  Every 8 elements is for the course of a day.  If you make i increase by 8 each time, then it will be 0, 8, 16, 24, 32
    // Even though you are only retrieving 5 elements, you are just indexing every 8th because 40/5 = 8.  Each index is set at 3 hour mark.  3 hours * 8 = 24 hours a day
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
        // += adds the right hand side to the variable on the left hand side
        // will increment each index value by 1 for 5 days
        index += 1
    }
};

// Function for fetching 5 Day Forecast data
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
            // Calls generateCard function
            generateCard(data.list);
        })
};

// Function for appending buttons to recently searched cities list
function displaySearchedCities() {
    recentSearchHistoryEl.empty();
    for (var i = 0; i < recentlySearchedCities.length; i++) {
        // Variable is recently searched cities converted to list item buttons
        var listBtn = $(`
        <li>
        <button type="button" data-city="new-york" class="btnCity";>
        ${recentlySearchedCities[i]}
        </button>
        </li>`);
        // Appends city list buttons to Recent Cities div
        recentSearchHistoryEl.append(listBtn);
        // If the length of recently searched cities is greater than 10, then splice elements
        if (recentlySearchedCities.length > 10) {
            // Splice removes elements from an array and inserts new elements in their place
            recentlySearchedCities.splice(i, 1);
        }
    }
};

// Event listener for list of recently searched cities / buttons
// Calls the current day forecast and 5 day forecast functions after clicking button
recentSearchHistoryEl.on("click", "button", function () {
    console.log($(this).text());
    var city = $(this).text();
    getWeather(city);
    get5Day(city);
});