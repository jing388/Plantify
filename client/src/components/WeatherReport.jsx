import React, { useEffect, useState } from "react";

const WeatherReport = () => {
  const [weather, setWeather] = useState({ description: "", temperature: "" });

  useEffect(() => {
    // Fetch data from a weather API (Replace `API_KEY` with your key)
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=API_KEY`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          description: data.weather[0].description,
          temperature: data.main.temp,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-stone-500">
        {weather.description}, {weather.temperature}°C
      </h2>
    </div>
  );
};

export default WeatherReport;
