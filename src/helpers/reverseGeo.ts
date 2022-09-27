import * as D from "io-ts/Decoder";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { handleAsyncError } from "./handle-async-error";
import { createReverseGeoUrl } from "../utils/define-urls";

const Location = D.struct({
  village: D.string,
});

async function reverseGeocoding(lat: string, long: string) {
  let url = createReverseGeoUrl(lat, long);
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
          (location) => location.village
        )
      );
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error: any) {
    handleAsyncError(error);
  }
}

export { reverseGeocoding };
