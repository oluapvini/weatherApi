import express from "express";

const app = express();
const PORT = 3333;

app.get("/weather/:city", (req, res) => {
    const city = req.params.city;
    
    res.json({
        city,
        temperature: 25, 
        condition: "Sunny"
    });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));