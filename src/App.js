import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather.js";
import Forecast from "./components/Forecast.js";
import Weathermap from "./components/Weathermap.js";
import { getLocation } from "./helpers/userLocation.js";
import { getSetRise } from "./helpers/SunsetSunriseApi.js";
import Context from "./Context";

function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);
  const [latlon, SetLatLon] = useState([51.5072, 0.1276]);
  const [SetRise, NewSetRise] = useState(null);

  const apikey = process.env.REACT_APP_API_KEY;
  let contextObj = { location, weather, forecast, latlon, SetRise };

  useEffect(() => {
    async function doAsyncAsSync() {
      let userhome = await getLocation();
      if (userhome) {
        console.log(userhome);
        getWeather(userhome.city);
        setLocation(userhome.city);
        SetLatLon([userhome.latitude, userhome.longitude]);
        let thetimes = await getSetRise(latlon[0], latlon[1]);
        NewSetRise(thetimes);
      } else {
        getWeather("London");
        getSunriseSunset([-0.1257, 51.5085]);
      }
    }

    doAsyncAsSync();
  }, []);

  async function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function handleChange(event) {
    setLocation(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(location);
  };

  function handleForecast(event) {
    event.preventDefault();
    getForecast(location);
  }

  async function getSunriseSunset(array) {
    let data = await getSetRise(array[0], array[1]);
    NewSetRise(data);
    console.log(data);
  }
  //helper to convert latlon object to an array
  function convertLatLong(obj) {
    console.log(Object.values(obj));
    let newarr = Object.values(obj);
    console.log(newarr);
    //SetLatLon(newarr.reverse());
    SetLatLon(Object.values(obj).reverse());
    getSunriseSunset(Object.values(obj).reverse());
  }

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
        console.log(response);
        console.log(data);
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
        console.log(response);
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
