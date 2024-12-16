const express = require("express");
const axios = require("axios");
const router = express.Router();

// Replace with your Weather API key and city
const WEATHER_API_KEY = "79c6ec23f5a04d86bb330353241012"; // Your valid API key
const CITY = "Manila"; // Your city of choice

router.get("/date-weather", async (req, res) => {
  try {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // Fetch the weather data from the API
    const weatherResponse = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${CITY}`
    );

    const weatherData = weatherResponse.data;
    const weatherDescription = weatherData.current.condition.text; // Correct access for weather condition

    res.json({
      date: dateString,
      weather: `It will be ${weatherDescription} later!`, // Use the condition text correctly
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Unable to fetch weather data." });
  }
});

module.exports = router;
