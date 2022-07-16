const baseurl = "https://api.opencagedata.com/geocode/v1/json?";
const geokey = "key=d875dd45373e44eab8e30c1e2bc93aac";

async function reverseGeocoding(lat, long) {
  let url = `${baseurl}${geokey}&q=${lat}+${long}`;
  try {
    let response = await fetch(url);
    console.log("Confirming reversed geocoding works" + url);
    if (response.ok) {
      let data = await response.json();
      let addressobject = data.results[0].components;
      let answer =
        addressobject[
          Object.keys(addressobject)[Object.keys(addressobject).length - 1]
        ];
      return answer;
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (err) {
    console.log("Network error:", err.message);
  }
}

export { reverseGeocoding };
