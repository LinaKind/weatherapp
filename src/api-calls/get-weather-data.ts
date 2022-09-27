import { handleAsyncError } from "../helpers/handle-async-error";
import { createOpenWeatherUrl } from "../utils/define-urls";

async function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getWeatherData(location: string) {
  await pause(1000);
  try {
    let response = await fetch(createOpenWeatherUrl(location));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error: any) {
    handleAsyncError(error);
  }
}
