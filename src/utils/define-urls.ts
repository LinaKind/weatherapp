/* Create url for reverse Geocode call */

const baseUrlGeoCode = "https://api.opencagedata.com/geocode/v1/json?";
const geoKey = `key=${process.env.REACT_APP_GEOCODE_KEY}`;

const reverseGeoUrlBase = `${baseUrlGeoCode}${geoKey}`;

export const createReverseGeoUrl = (lat: string, long: string) => {
  return `${reverseGeoUrlBase}&q=${lat}+${long}`;
};

/* Create url for Open Weather calls */

const apiKeyOpenWeather = process.env.REACT_APP_API_KEY;

export const createOpenWeatherUrl = (location: string) => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKeyOpenWeather}&units=metric`;
};

export const createOpenWeatherUrlForForecast = (location: string) => {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKeyOpenWeather}`;
};
