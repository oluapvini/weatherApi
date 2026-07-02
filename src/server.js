import express from "express";
import "dotenv/config";
import { env } from "./config/env.js";

const app = express();
const PORT = env.port;

app.get("/weather/:city", (req, res) => {
    const city = req.params.city;
    
    res.json({
        city,
        temperature: 25, 
        condition: "Sunny"
    });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));