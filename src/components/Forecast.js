import React, { useContext } from "react";
import Context from "../Context";
import "./Forecast.css";

function Forecast(props) {
  let { forecast } = useContext(Context);
  return (
    <div>
      {forecast && (
        <div className="forecast">
          {forecast.list
            .filter((e, ix) => {
              return ix % 8 === 0;
            })
            .map(u => (
              <div id="card" key={u.dt}>
                {u.dt_txt.substr(0, 10)}{" "}
                <p id="temp">{Math.round(u.main.temp)} °C </p>
              {  <img src={`http://openweathermap.org/img/wn/${u.weather[0].icon}@2x.png`}/>}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;