const baseurl = "https://api.opencagedata.com/geocode/v1/json?q=";
const geokey = "&key=825fd864c7d44f6eb76d4d85462a24ea&language=en&pretty=1"

async function reverseGeocoding(lat, long){
    let url =  `${baseurl}${lat}+${long}${geokey}`;
    try {
        let response = await fetch (url);
        if (response.ok) {
            let data = await response.json();
            let addressobject = data.results[0].components;
            let answer = addressobject[Object.keys(addressobject)[Object.keys(addressobject).length - 1]]; 
            return answer;
        } else {
            console.log("Server error:", response.status, response.statusText);
        }
    } catch(err) {
        console.log("Network error:", err.message);
    }

}

export {reverseGeocoding}