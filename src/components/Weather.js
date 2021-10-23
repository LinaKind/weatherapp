import React, { useContext } from "react";
import Context from "../Context";
import "./Weather.css";

function Weather(props) {
  let { weather } = useContext(Context);
  return (
    <div>
      {weather && (
        <div id="temperature">
          <p>
            The temperature in {weather.name} is {Math.round(weather.main.temp)}
            °C. Feels like {Math.round(weather.main.feels_like)} °C. Humidity -{" "}{weather.main.humidity} %.
            For more, click on the icon below.
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;