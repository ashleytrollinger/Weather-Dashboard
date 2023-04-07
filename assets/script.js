//Setting up API 
var APIkey = "a7018c53fee50f9a9de76792075016f8";
var city = "";

//Moving my HTML elements into the JS
var submitBtn = document.getElementById("submitBtn");
var searchHistory = document.getElementById("searchHistory");
var todayForecast = document.getElementById("todayForecast");
var fiveDayForecast = document.getElementById("fiveDayForecast");
var searchHistory = document.getElementById("searchHistory");


function getWeather(event) {
    event.preventDefault();
    city = document.getElementById("cityName").value;
    loadWeather(city);

}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function loadWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + APIkey;

    //Wipe whatever is on the screen


    fetch(queryURL).then(response => {
        console.log(response);

        return response.json();
    }).then(data => {
        //console logging all the data needed
        console.log(data);
        console.log("Humidity: " + data.list[0].main.humidity);
        console.log("Temperature: " + data.list[0].main.temp);
        console.log("Wind Speed: " + data.list[0].wind.speed);
        console.log("Weather Icon: " + data.list[0].weather[0].icon);

        removeAllChildNodes(todayForecast);
        removeAllChildNodes(fiveDayForecast);

        //Append the Location to the todayForecast section
        var cityHeader = document.createElement("h1");

        cityHeader.textContent = data.city.name;
        todayForecast.appendChild(cityHeader);

        //Creating the icon
        var icon = document.createElement("img");
        var iconCode = data.list[0].weather[0].icon;
        icon.src = "http://openweathermap.org/img/w/" + iconCode + ".png";
        todayForecast.appendChild(icon);


        //Creating the date
        const d = new Date();
        var todaysMonth = d.getMonth() + 1;
        var todaysDay = d.getDate();
        var todaysYear = d.getFullYear();
        var todaysDate = (todaysMonth + "/" + todaysDay + "/" + todaysYear);

        //Append the Date to the todayForecast section
        var dateHeader = document.createElement("h2");
        dateHeader.textContent = todaysDate;
        todayForecast.appendChild(dateHeader);

        // //Adding icon Next to cityHeader
        // var weatherIcon = document.createElement("img");
        // weatherIcon.src = data.weather[0].icon;
        // todayForecast.appendChild(weatherIcon);

        //Creating the variables for the data to be appended
        var locationTemp = document.createElement("h3");
        locationTemp.textContent = ("Temperature: " + data.list[0].main.temp + "°F");

        var locationWind = document.createElement("h3");
        locationWind.textContent = ("Wind: " + data.list[0].wind.speed + "MPH");

        var locationHumidity = document.createElement("h3");
        locationHumidity.textContent = ("Humidity: " + data.list[0].main.humidity + "%");

        //Append the data to the todayForecast section
        todayForecast.appendChild(locationTemp);
        todayForecast.appendChild(locationWind);
        todayForecast.appendChild(locationHumidity);


        //Creating a for loop that goes over the index 1-5 of the list array and creates the five day forecast
        for (let i = 1; i < data.list.length; i++) {
            //Console logging the data to make sure this works
            // console.log("Temp: " + i + " " + data.list[i].main.temp);
            // console.log("Wind: " + i + " " + data.list[i].wind.speed);
            // console.log("Humidity: " + i + " " + data.list[i].main.humidity);
            // console.log ("Weather Icon: " + data.list[i].weather[0].icon)

            //Creating the date for the header of each day forecast
            var weekDates = todaysDay + i;
            var weekFullDate = (todaysMonth + "/" + weekDates + "/" + todaysYear);

            //Appending the dates
            var weekDatesHeader = document.createElement("h3");
            weekDatesHeader.textContent = weekFullDate;
            fiveDayForecast.appendChild(weekDatesHeader);

            //Creating the icons and appending them
            var weekIcon = document.createElement("img");
            var weekIconCode = data.list[i].weather[0].icon
            weekIcon.src = "http://openweathermap.org/img/w/" + weekIconCode + ".png"
            fiveDayForecast.appendChild(weekIcon);

            //Creating the variables for the data to be appended
            var weekTemp = document.createElement("h4");
            weekTemp.textContent = ("Temperature: " + data.list[i].main.temp + "°F");

            var weekWind = document.createElement("h4");
            weekWind.textContent = ("Wind: " + data.list[i].wind.speed + "MPH");

            var weekHumidity = document.createElement("h4");
            weekHumidity.textContent = ("Humidity: " + data.list[i].main.humidity + "%");

            var styleLine = document.createElement("hr");


            //Appending the data to the fiveDayForecast screen

            fiveDayForecast.appendChild(weekTemp);
            fiveDayForecast.appendChild(weekWind);
            fiveDayForecast.appendChild(weekHumidity);
            fiveDayForecast.appendChild(styleLine);
        }
        //Create the history 
        localStorage.setItem("City name", data.city.name);
        var historyBtn = document.createElement("button");
        historyBtn.textContent = data.city.name;
        historyBtn.addEventListener("click", function () {
            loadWeather(data.city.name);
        });

        historyBtn.id = 'historyBtn';
        searchHistory.appendChild(historyBtn);



    })
}








//Tutor Help
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=sacramento&appid=${APIkey}`).then(george => {
//     console.log(george)
//     return george.json()
// }).then(susan => {
//     console.log(susan)
// })