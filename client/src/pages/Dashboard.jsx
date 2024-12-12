import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Typography } from "@mui/material";
import Heart from "../assets/heart.png";
import HealthyPlant from "../assets/healthy-plant.png";
import UnhealthyPlant from "../assets/unhealthy-plant.png";
import StatisticsCard from "../components/StatisticsCard";
import Temperature from "../assets/temperature.png";
import SoilMoisture from "../assets/soil-moisture.png";
import LastWatered from "../assets/last-watered.png";
import Hill from "../assets/hill.png";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    background: {
      default: "#F0F1EA",
    },
  },
});

export default function Dashboard() {
  const [isHealthy, setIsHealthy] = useState(true);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const fetchDateAndWeather = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/date-weather");
        const data = await response.json();
        setDate(data.date);
        setWeather(data.weather);
      } catch (error) {
        console.error("Error fetching date and weather:", error);
      }
    };

    fetchDateAndWeather();
  }, []);

  const togglePlantHealth = () => {
    setIsHealthy(!isHealthy);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header />
        {/* Date and Weather Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 8,
            mx: 15,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "medium",
                marginBottom: "4px",
                letterSpacing: "-0.06em",
              }}
            >
              {date || "Loading date..."}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#97A167",
                letterSpacing: "-0.04em",
                paddingBottom: "8px",
              }}
            >
              {weather || "Fetching weather..."}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: "#2a2a2a",
              color: "#2a2a2a",
              fontWeight: "500",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Plant care help!
            <Box
              component="img"
              src={Heart}
              alt="Heart Icon"
              sx={{ width: "1em", height: "1em" }}
            />
          </Button>
        </Box>
        {/* Plant Images Section */}
        <Box
          sx={{
            position: "relative",
            width: "250px",
            height: "250px",
            mx: "auto",
            mt: 10,
          }}
        >
          <Box
            component="img"
            src={HealthyPlant}
            alt="Healthy Plant"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: isHealthy ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          <Box
            component="img"
            src={UnhealthyPlant}
            alt="Unhealthy Plant"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: isHealthy ? 0 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Box>
        {/* Toggle Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="outlined"
            onClick={togglePlantHealth}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              backgroundColor: "#4DB30B",
              color: "white",
              fontWeight: "semibold",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              "&:hover": {
                backgroundColor: "#3E9109",
                border: "none",
              },
            }}
          >
            {isHealthy ? "Low Moisture Detected!" : "Plant Revived!"}
          </Button>
        </Box>
        {/* Statistics Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 8 }}>
          <StatisticsCard
            label="Temperature"
            icon={Temperature} // Pass the image path here
            value="28.7 °C"
          />
          <StatisticsCard
            label="Soil Moisture"
            icon={SoilMoisture} // Pass the image path here
            value="45%"
          />
          <StatisticsCard
            label="Last Watered"
            icon={LastWatered} // Pass the image path here
            value="2 days ago"
          />
        </Box>
        <Box
          component="img"
          src={Hill}
          alt="Hill"
          sx={{
            position: "absolute",
            top: "65%",
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            zIndex: -1,
            "@media (max-width: 768px)": {
              // Apply cropping for smaller screens
              width: "auto", // Keeps the original width
              height: "auto", // Maintains the aspect ratio
              maxHeight: "100vh", // Cropping happens based on height
              maxWidth: "100vw", // Cropping happens based on width
              objectFit: "cover", // Ensures the image fills the visible area
              objectPosition: "center", // Crops from the center
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
