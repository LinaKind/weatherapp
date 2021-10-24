import { reverseGeocoding } from "./reverseGeo";

  async function getLocation() {
    try {
        let opts = { timeout: 2000 };
        let geoPos = await _asyncGetCurrentPosition(opts);
        let { latitude, longitude } = geoPos.coords;
        let city = await reverseGeocoding(latitude, longitude);
        let newobj = {
          city: city,
          latitude: latitude,
          longitude: longitude
        }
        return newobj;
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
 