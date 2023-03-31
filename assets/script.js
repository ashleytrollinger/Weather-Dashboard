//Setting up API 
var APIkey = "a7018c53fee50f9a9de76792075016f8";
var city = "";

//Moving my HTML elements into the JS
var submitBtn = document.getElementById("submitBtn");
var searchHistory = document.getElementById("searchHistory");
var todayForecast = document.getElementById("todayForecast");


function getWeather(event) {
    console.log(event)
    event.preventDefault()
    city = document.getElementById("cityName").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    fetch(queryURL).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        //console logging all the data needed
        console.log(data);
        console.log("Humidity: " + data.main.humidity);
        console.log("Temperature: " + data.main.temp);
        console.log("Wind Speed: " + data.wind.speed);
        console.log("Weather Icon: " + data.weather[0].icon);

        //Append the Location to the todayForecast section
        var cityHeader = document.createElement("h1");
        cityHeader.textContent = data.name;
        todayForecast.appendChild(cityHeader);

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

        //Creating the variables for the data to be appended
        var locationTemp = document.createElement("h3");
        locationTemp.textContent = ("Temperature: " + data.main.temp + "°F");

        var locationWind = document.createElement("h3");
        locationWind.textContent = ("Wind: " + data.wind.speed + "MPH");

        var locationHumidity = document.createElement("h3");
        locationHumidity.textContent = ("Humidity: " + data.main.humidity + "%");

        //Append the data to the todayForecast section
        todayForecast.appendChild(locationTemp);
        todayForecast.appendChild(locationWind);
        todayForecast.appendChild(locationHumidity);

        //Create a button in searchHistory section that links to all that saved in local storage
        



    })

}


//Tutor Help
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=sacramento&appid=${APIkey}`).then(george => {
//     console.log(george)
//     return george.json()
// }).then(susan => {
//     console.log(susan)
// })