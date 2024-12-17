import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Typography, Snackbar, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import HealthyPlant from "../assets/healthy-plant.png";
import UnhealthyPlant from "../assets/unhealthy-plant.png";
import StatisticsCard from "../components/StatisticsCard";
import Temperature from "../assets/temperature.png";
import SoilMoisture from "../assets/soil-moisture.png";
import LastWatered from "../assets/last-watered.png";
import { CSSTransition } from "react-transition-group";
import WaterDropSharpIcon from "@mui/icons-material/WaterDropSharp";
import { formatDistanceToNow } from "date-fns";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { PlantDialogue } from "../components/PlantDialogue";
import SoilMoistureGuideModal from "../components/SoilMoistureGuide";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    background: {
      default: "#F3F4EC",
    },
  },
});

const ADEQUATE_SOIL_MOISTURE = 50;

export default function Dashboard() {
  const [lastWatered, setLastWatered] = useState(null);
  const [latestReading, setLatestReading] = useState(null);
  const [isHealthy, setIsHealthy] = useState(true);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isFirstAlert, setIsFirstAlert] = useState(true);
  const [isAutoWatering, setIsAutoWatering] = useState(false);
  const [user, setUser] = useState(null);
  const [isSoilMoistureGuideOpen, setIsSoilMoistureGuideOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setIsFirstAlert(false);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        window.location.href = "/signin";
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchLatestReading = async () => {
    try {
      const response = await fetch("${API_BASE_URL}/api/latest-reading");
      const data = await response.json();
      setLatestReading(data);

      if (data.soil_moisture < ADEQUATE_SOIL_MOISTURE) {
        setIsHealthy(false);
      } else {
        setIsHealthy(true);
      }
    } catch (error) {
      console.error("Error fetching the latest reading:", error);
    }
  };

  const fetchLastWatered = async () => {
    try {
      const response = await fetch("${API_BASE_URL}/api/last-watered");
      const data = await response.json();
      setLastWatered(data.timestamp);
    } catch (error) {
      console.error("Error fetching last watered timestamp:", error);
    }
  };

  useEffect(() => {
    fetchLatestReading();
    const intervalId = setInterval(fetchLatestReading, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchLastWatered();
    const intervalId = setInterval(fetchLastWatered, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const readingTime = new Date(timestamp);
    const diff = formatDistanceToNow(readingTime, { addSuffix: true });
    return diff;
  };

  const handleWateringToggle = async () => {
    try {
      const response = await fetch("${API_BASE_URL}/api/update-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: isWatering ? 0 : 1 }),
      });

      if (response.ok) {
        setIsWatering(!isWatering);
        setSnackbarMessage(
          isWatering ? "Watering complete!" : "Watering now..."
        );
        setSnackbarOpen(true);
      } else {
        console.error("Failed to update command in the database");
      }
    } catch (error) {
      console.error("Error updating command:", error);
    }
  };

  useEffect(() => {
    const fetchDateAndWeather = async () => {
      try {
        const response = await fetch("${API_BASE_URL}/api/date-weather");
        const data = await response.json();
        setDate(data.date);
        setWeather(data.weather);
      } catch (error) {
        console.error("Error fetching date and weather:", error);
      }
    };

    fetchDateAndWeather();
  }, []);

  const handleAutoWateringToggle = async () => {
    try {
      const response = await fetch("${API_BASE_URL}/api/auto-watering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ automatic: isAutoWatering ? 0 : 1 }),
      });

      if (response.ok) {
        setIsAutoWatering(!isAutoWatering);
        setSnackbarMessage(
          isAutoWatering
            ? "Auto-watering disabled successfully!"
            : "Auto-watering enabled successfully!"
        );
        setSnackbarOpen(true);
      } else {
        console.error("Failed to update auto-watering state");
      }
    } catch (error) {
      console.error("Error updating auto-watering state:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const togglePlantHealth = () => {
    setIsHealthy(!isHealthy);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSoilMoistureGuideToggle = () => {
    setIsSoilMoistureGuideOpen(!isSoilMoistureGuideOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header />
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
            onClick={handleSoilMoistureGuideToggle}
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
            Soil Moisture Guide
            <WaterDropSharpIcon
              sx={{ width: "0.9em", height: "auto", fontSize: "small" }}
            />
          </Button>
        </Box>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <PlantDialogue
            sx={{ mt: -5 }}
            moisture={latestReading?.soil_moisture || 0}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 item"
          />
          <Box
            sx={{
              position: "relative",
              width: "250px",
              height: "250px",
              mx: "auto",
              mt: 5,
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
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            position: "relative",
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleWateringToggle}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  backgroundColor: isWatering ? "#FF5722" : "#4DB30B",
                  color: "white",
                  fontWeight: "semibold",
                  padding: "10px 20px",
                  boxShadow: "none",
                  border: "none",
                  outline: "none",
                  "&:hover": {
                    backgroundColor: isWatering ? "#E64A19" : "#3E9109",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:active": {},
                }}
              >
                {isWatering ? "Click to stop watering" : "Water now!"}
              </Button>
            </Box>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              spacing={-1.5}
            >
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="end"
                    control={
                      <Switch
                        color="primary"
                        checked={isAutoWatering}
                        onChange={handleAutoWateringToggle}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#4CAF50",
                            "&:hover": {
                              backgroundColor: "rgba(76, 175, 80, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#4CAF50",
                            },
                        }}
                      />
                    }
                    label="Allow Auto-Watering"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
              <Tooltip
                title="When soil moisture is detected to be low, the plant will be watered automatically."
                placement="top"
              >
                <IconButton sx={{ p: "4px" }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={isFirstAlert ? null : 5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="info"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <CSSTransition
            in={showAlert}
            timeout={500}
            classNames="Alert"
            unmountOnExit
          >
            <Alert
              severity="success"
              sx={{
                position: "absolute",
                top: "100%",
                mt: 2,
              }}
            >
              Watering successful!
            </Alert>
          </CSSTransition>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 8 }}>
          <StatisticsCard
            label="Temperature"
            icon={Temperature}
            value={
              latestReading ? `${latestReading.temperature} °C` : "Loading..."
            }
            valueStyle={{ fontSize: "24px", color: "#FF5722" }}
          />
          <StatisticsCard
            label="Soil Moisture"
            icon={SoilMoisture}
            value={
              latestReading ? `${latestReading.soil_moisture}%` : "Loading..."
            }
            valueStyle={{ fontSize: "24px", color: "#4CAF50" }}
          />
          <StatisticsCard
            label="Last Watered"
            icon={LastWatered}
            value={lastWatered ? formatTimestamp(lastWatered) : "Loading..."}
            valueStyle={{ fontSize: "20px", color: "#2196F3" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "65%",
            width: "100%",
            height: "80vh",
            backgroundColor: "#9CC887",
            zIndex: -2,
            "@media (max-width: 768px)": {
              width: "full",
              height: "full",
              top: "70%",
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
        />
        <SoilMoistureGuideModal
          open={isSoilMoistureGuideOpen}
          onClose={() => setIsSoilMoistureGuideOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
}
