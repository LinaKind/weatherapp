import React, { useContext } from "react";
import Context from "../Context";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Weathermap() {
    let { latlon, weather } = useContext(Context);
    return (
        <div>
             <MapContainer 
             //creates a new mapcontainer component everytime latlon state gets update
             key={JSON.stringify(latlon)}
             center={latlon} 
             zoom={10} 
             scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={latlon}>
                <Popup>
                {weather && (
        <div>
          <p>
            The temperature in {weather.name} is {Math.round(weather.main.temp)}
            °C. Feels like {Math.round(weather.main.feels_like)} °C. Humidity -{" "}
            {weather.main.humidity} %.
          </p>
        </div>
      )}
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Weathermap;