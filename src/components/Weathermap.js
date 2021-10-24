import React, { useContext } from "react";
import Context from "../Context";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../components/Weathermap.css"

const L = window.L;

function Weathermap() {

 let  greenIcon = new L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41]
});
    let { latlon, weather, SetRise } = useContext(Context);
    return (
        <div className="map">
             <MapContainer 
             //creates a new mapcontainer component everytime latlon state gets update
             key={JSON.stringify(latlon)}
             center={latlon} 
             zoom={12} 
             scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={latlon} icon={greenIcon}>
                <Popup>
                {weather && (
        <div>
          <p>
            <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            {weather.weather[0].main}
            </div>
            <div>
            <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-sunrise-nature-flatart-icons-flat-flatarticons.png"/>
            {SetRise.sunrise}
            </div>
            <div>
            <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-sunset-nature-flatart-icons-flat-flatarticons.png"/>
            {SetRise.sunset}
            </div>
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