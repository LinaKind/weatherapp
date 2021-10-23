import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather.js";
import Forecast from "./components/Forecast.js";
import Weathermap from "./components/Weathermap.js";
import {getLocation} from "./helpers/userLocation.js";
import Context from "./Context";


function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);
  const [latlon, SetLatLon] = useState(null);



  const apikey = process.env.REACT_APP_API_KEY;
  let contextObj = { location, weather, forecast, latlon };

 useEffect(() => {
  async function doAsyncAsSync() {
    let userhome = await getLocation(); 
    if (userhome) {
      getWeather(userhome);
    } else {
      getWeather("London");
    }
    
}

doAsyncAsSync(); 
  
  }, []);

  async function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 /* const readData = async () => {
    try {
      const userlocation = await getLocation();
      console.log(userlocation);
    } catch (err) {
      console.log(err);
    }
  }*/

  /*const getLocation = () => {
    if (!navigator.geolocation) {
     // setStatus('Geolocation is not supported by your browser');
    } else {
      //setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
       // setStatus(null);
        SetNewOne([position.coords.latitude, position.coords.longitude])
        let x = reverseGeocoding(position.coords.latitude, position.coords.longitude)
        console.log(x);
        //setLat(position.coords.latitude);
        //setLng(position.coords.longitude);
      }, () => {
       // setStatus('Unable to retrieve your location');
      });
    }
  }*/

  function handleChange(event) {
    setLocation(event.target.value);
  }


  const handleSubmit = e => {
    e.preventDefault();
    getWeather(location);
  };

  function handleForecast(event) {
    event.preventDefault();
    getForecast(location);
  }
  //helper to convert latlon object to an array
  function convertLatLong(obj) {
    console.log(Object.values(obj));
    let newarr = Object.values(obj);
    //SetLatLon(newarr.reverse());
    SetLatLon((Object.values(obj)).reverse());
  }

 /* const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geo Location not supported by your browser")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log([position.coords.latitude, position.coords.longitude]);
        SetLatLon([position.coords.latitude, position.coords.longitude]);
      }, () => {
        console.log("Unable to get location")
      });
    }
  }*/
  async function getWeather(location) {
    // call Open Weather API
    setLoading(true);
    setError("");
    setWeather(null);
    await pause(1000);
    try {
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`
      );
      if (response.ok) {
        let data = await response.json();
        setWeather(data);
        convertLatLong(data.coord);    
      } else {
        setError(`Server error: ${response.state} ${response.statusText}`);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
    setLoading(false);
  }

  async function getForecast(location) {
    // call Open Weather API
    setLoading(true);
    setError("");
    setForecast(null);
    await pause(1000);
    try {
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apikey}`
      );
      if (response.ok) {
        let forecast = await response.json();
        setForecast(forecast);
      } else {
        setError(`Server error: ${response.state} ${response.statusText}`);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <div id="App">
      <nav>
        <h1>What's the wheather like?</h1>
      </nav>
      <form className="form" onSubmit={handleSubmit}>
        <div id="left">
          <label>
            Enter a city
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={location.name}
            />
          </label>
        </div>
        <div id="button">
          <button>Get Wheather</button>
        </div>
        <div id="left">
          <p>Get five day forecast!</p>
        </div>
        <div id="button">
          <button onClick={handleForecast} type="button">
            Get Forecast
          </button>
        </div>
      </form>
      {loading && <h2>Loading...</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
   
      <Context.Provider value={contextObj}>
        <Weather />
        <Forecast />
        <Weathermap />
      </Context.Provider>
    </div>
  );
}

export default App;
