import { handleAsyncError } from "../helpers/handle-async-error";
import { createOpenWeatherUrlForForecast } from "../utils/define-urls";

async function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getForecastData(location: string) {
  await pause(1000);
  try {
    let response = await fetch(createOpenWeatherUrlForForecast(location));
    if (response.ok) {
      const forecast = await response.json();
      return forecast;
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    handleAsyncError(error);
  }
}
