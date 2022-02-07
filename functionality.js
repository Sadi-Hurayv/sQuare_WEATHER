window.addEventListener("load", () => {

  //Time
  function showTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var session = "AM";

    if(hour==0){
      hour=12;
    }
    else if(hour>12){
      hour = hour-12;
      session = "PM";
    }

    hour = (hour<10) ? "0" + hour : hour;
    min = (min<10) ? "0" + min : min;
    sec = (sec<10) ? "0" + sec : sec;

    var time = hour + ":" + min + ":" + sec + " " + session;
    document.getElementById("digitalClock").innerText = time;
    document.getElementById("digitalClock").textContent = time;
    setTimeout(showTime,1000);
  }
  showTime();


  //Weather
  var lon;
  var lat;
  var location = document.querySelector(".location-cuntry-city");
  var icon = document.querySelector(".icon");

  var temperature = document.querySelector(".temperature");
  var temperatureSection = document.querySelector(".temperature-section");
  var temperatureSectionUnit = document.querySelector(".temperature-section span");

  var humidity = document.querySelector(".weather-humidity");
  var pressure = document.querySelector(".weather-pressure");
  var windSpeed = document.querySelector(".weather-wind-speed");
  var feelsLike = document.querySelector(".weather-feels-like");

  var weatherDescriptionMain = document.querySelector(".weather-description-main");
  var weatherDescriptionDetails = document.querySelector(".weather-description-details");


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

      //Get geolocation
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      //Get API
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b13be9f4fea0f1ed80899d311b4dc54e`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data => {
          console.log(data);

          //Get location
          location.textContent=data.sys.country + " / " + data.name;

          //Get icon
          icon.src="http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png"

          //Get temperature
          temperature.textContent=data.main.temp;

          //Get feels like
          feelsLike.textContent="Feels Like: " + data.main.feels_like + " °C";

          //Temperature conversion
          temperatureSection.addEventListener("click", ()=>{
            if(temperatureSectionUnit.textContent==="°C"){
              temperature.textContent=(((data.main.temp * 9) / 5) + 32).toFixed(2);
              temperatureSectionUnit.textContent="°F";
              feelsLike.textContent="Feels Like: " + (((data.main.feels_like * 9) / 5) + 32).toFixed(2) + " °F";
            }
            else{
              temperature.textContent=data.main.temp;
              temperatureSectionUnit.textContent="°C";
              feelsLike.textContent="Feels Like: " + data.main.feels_like + " °C";
            }
          });

          //Get humidity
          humidity.textContent="Humidity: " + data.main.humidity + "%";

          //Get pressure
          pressure.textContent="Pressure: " + data.main.pressure + " hPa";

          //Get wind speed
          windSpeed.textContent="Wind Speed: " + data.wind.speed + " km/h";

          //Get weather description
          weatherDescriptionMain.textContent=data.weather[0].main;
          weatherDescriptionDetails.textContent="It's " + data.weather[0].description + "!!!";

        });

    });
  }

});
