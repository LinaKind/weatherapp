
import {getSunriseSunsetInfo} from "sunrise-sunset-api";

async function getSetRise(lat, long) {
    const response = await getSunriseSunsetInfo({
        latitude: lat,
        longitude: long,
    });
    console.log(response);
    return response;
}

export {getSetRise}