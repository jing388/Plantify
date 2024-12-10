import React, { useState } from "react";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HealthyPlant from "../assets/healthy-plant.png";
import UnhealthyPlant from "../assets/unhealthy-plant.png";
import { Button, Typography } from "@mui/material";
import Heart from "../assets/heart.png";

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
  const [isHealthy, setIsHealthy] = useState(true); // State to toggle between healthy and unhealthy plant

  // Simulate moisture detection toggle
  const togglePlantHealth = () => {
    setIsHealthy(!isHealthy);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
              Monday, September 12
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#97A167",
                letterSpacing: "-0.04em",
                paddingBottom: "8px",
              }}
            >
              Beware of thunderstorms later!
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
              sx={{
                width: "1em",
                height: "1em",
              }}
            />
          </Button>
        </Box>

        {/* Plant Images Section */}
        <Box
          sx={{
            position: "relative",
            width: "250px",
            height: "250px",
            mx: "auto", // Center horizontally
            mt: 10,
          }}
        >
          {/* Healthy Plant */}
          <Box
            component="img"
            src={HealthyPlant}
            alt="Healthy Plant"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: isHealthy ? 1 : 0, // Show or hide based on state
              transition: "opacity 0.5s ease-in-out", // Smooth fade effect
            }}
          />

          {/* Unhealthy Plant */}
          <Box
            component="img"
            src={UnhealthyPlant}
            alt="Unhealthy Plant"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: isHealthy ? 0 : 1, // Show or hide based on state
              transition: "opacity 0.5s ease-in-out", // Smooth fade effect
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
      </Box>
    </ThemeProvider>
  );
}
