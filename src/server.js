import express from "express";
import "dotenv/config";
import { env } from "./config/env.js";
import { fetchWeatherByCity, formatWeatherResponse } from "./clients/visual-crossing.client.js";

const app = express();

app.get("/", (req, res) => {
    return res.json({
        message: "Weather API is running",
    });
});

app.get("/weather/:city", async (req, res) => {
try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({
                message: "City is required.",
            });
        }

        const weatherData = await fetchWeatherByCity(city);
        const formattedWeather = await formatWeatherResponse(weatherData);

        return res.json(formattedWeather);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch weather data.",
        });
    }
});

app.listen(env.port, () => console.log(`O servidor está rodando na porta ${env.port}`));