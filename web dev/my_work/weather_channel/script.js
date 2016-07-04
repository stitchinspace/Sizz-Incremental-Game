"use strict";
document.addEventListener("DOMContentLoaded", function() {
    var xhr = false;

    function getLocation() {
        console.log("getLocation called");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var loni = position.coords.longitude;
                var lati = position.coords.latitude;
                console.log(lati, loni);
                makeRequest(lati, loni);
            });
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    getLocation();

    function makeRequest(lati, loni) {
        console.log("makeRequest called");
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + loni + "&units=metric&APPID=f868e4b1f7dfdcb922408670cdb4f5a9";
        console.log(url);
var uvurl = "http://api.openweathermap.org/v3/uvi/" + lati +","+ loni + ".json?APPID=f868e4b1f7dfdcb922408670cdb4f5a9";
console.log ("uvurl: "+uvurl);
if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onload = showState;
            xhr.open('GET', url);
            xhr.send();
            // xhr.open('GET', uvurl);
            // xhr.send();

        } else {
            document.querySelector('#weather').innerHTML = 'Oops, request cannot be made.';
        }
    }

    function showState() {
        console.log("showState called");
        // document.querySelector('#weather').innerHTML = 'The current state is: ' + xhr.readyState + ' and the status is: ' + xhr.status;
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 400) {
            var data = JSON.parse(xhr.responseText);
            processResponse(data);
        }
    }
    function processResponse(data) {
          console.log("processResponse called");
console.log(data);
var city = data.name;
console.log(city);
var temp = data.main.temp;
console.log("temp"+temp);
var weather = data.weather[0].main;
console.log("weather" + weather);

    }
});

 // function toggleUnits() {
 //        if (countryUnits === 'metric') {                           // check if currently set to imperial or metric.
 //            tempSymbol = 'F';
 //            windSymbol = 'miles/hour';
 //            countryUnits = 'imperial';
 //            pressureSymbol = 'mb';
 //            button.innerHTML = 'Use Metric Units';
 //            temperature = Math.round((temperature * 9 / 5) + 32);       // convert temperature to 'fahrenheit'.
 //            displayTemperature.innerHTML = temperature;
 //            displayDegreeSymbol.innerHTML = " &deg;" + tempSymbol;
 //            windSpeed = Math.round(windSpeed / 1.609344);               // convert wind speed to 'miles/hr'.
 //            displayWinds.innerHTML = "Winds " + windDirection + " " + windSpeed + " " + windSymbol;
 //            pressure = pressure * 10;                                   // convert pressure to 'mb'.
 //            displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
 //        }
 //        else {
 //            tempSymbol = 'C';
 //            countryUnits = 'metric';
 //            windSymbol = 'km/hour';
 //            pressureSymbol = 'kPa';
 //            button.innerHTML = 'Use Imperial Units';
 //            temperature = Math.round((temperature - 32) * 5 / 9);       // convert temperature to 'celsius'.
 //            displayTemperature.innerHTML = temperature;
 //            displayDegreeSymbol.innerHTML = " &deg;" + tempSymbol;
 //            windSpeed = Math.round(windSpeed * 1.609344);               // convert wind speed to 'Km/h'.
 //            displayWinds.innerHTML = "Winds " + windDirection + " " + windSpeed + " " + windSymbol;
 //            pressure = pressure / 10;                                   // convert pressure to'KPa'.
 //            displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
 //        }
 //    }
