import * as D from "io-ts/Decoder";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

const baseurl = "https://api.opencagedata.com/geocode/v1/json?";
const geokey = `key=${process.env.REACT_APP_GEOCODE_KEY}`;

const Location = D.struct({
  suburb: D.string,
});

async function reverseGeocoding(lat: string, long: string) {
  let url = `${baseurl}${geokey}&q=${lat}+${long}`;
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      const addressobject = data.results[0].components;
      return pipe(
        addressobject,
        Location.decode,
        E.match(
          (error) => `Error is ${error}`,
          (location) => location.suburb
        )
      );
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    const additionalErrorMessage = "Failed to do something";
    error instanceof Error
      ? console.log("Network error:", error.message)
      : console.log(additionalErrorMessage);
  }
}

export { reverseGeocoding };
