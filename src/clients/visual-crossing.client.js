import { env } from "../config/env.js";

export function buildWeatherUrl(city) {
  const encodedCity = encodeURIComponent(city);

  return `${env.visualCrossingBaseUrl}/${encodedCity}?unitGroup=metric&contentType=json&key=${env.visualCrossingApiKey}`;
}

export async function fetchWeatherByCity(city) {
  const url = buildWeatherUrl(city);

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`Visual Crossing API error: ${resp.status}`);
  }

  const obj = await resp.json();

  return obj;
}

export async function formatWeatherResponse(data) {
    const today = data.days[0];
    
    return {
        city: data.address,
        resolvedAddress: data.resolvedAddress,
        timezone: data.timezone,
        description: data.description,
        temperature: today.temp,
        feelsLike: today.feelslike,
        tempMin: today.tempmin,
        tempMax: today.tempmax,
        humidity: today.humidity,
        windSpeed: today.windspeed,
        conditions: today.conditions,
        date: today.datetime,
        source: "api",
    };
}