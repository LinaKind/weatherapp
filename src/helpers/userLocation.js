import { reverseGeocoding } from "./reverseGeo";

/*function getLocation() {
    if (!navigator.geolocation) {
      console.log("Geo Location not supported by your browser")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
       let city = reverseGeocoding(position.coords.latitude, position.coords.longitude);
       return city;
      }, () => {
        console.log("Unable to get location")
      });
    }
  } */

/*async function getLocation() {
       // let city
      if (!navigator.geolocation) {
          console.log("Geo Location not supported by your browser")
      } else {
          navigator.geolocation.getCurrentPosition(async (position) => {
            
            let city = await reverseGeocoding(position.coords.latitude, position.coords.longitude);
             // let latlong = [position.coords.latitude, position.coords.longitude]
              //return latlong
              //const data = await city.json();
              console.log(city);
       
             return city;
          })
      }
  //  return city
  }*/

  async function getLocation() {
    try {
        let opts = { timeout: 2000 };
        let geoPos = await _asyncGetCurrentPosition(opts);
        let { latitude, longitude } = geoPos.coords;
        let city = await reverseGeocoding(latitude, longitude);
        return city;
    } catch (err) {
        console.log('geoloc: error:', err);
    }
  }
  async function _asyncGetCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        } else {
            reject( Error('Browser does not support geolocation') );
        }
    });
}


    export { getLocation}
 