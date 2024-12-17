import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth
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
import SettingsModal from "../components/SettingsModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isWatering, setIsWatering] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isFirstAlert, setIsFirstAlert] = useState(true);
  const [isAutoWatering, setIsAutoWatering] = useState(false);
  const [user, setUser] = useState(null); // State to store user info

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setIsFirstAlert(false); // After the first alert, subsequent ones will auto-hide
  };

  // Monitor authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        window.location.href = "/signin"; // Navigate to signin page if user is null
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Fetch the latest readings from the server
  const fetchLatestReading = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/latest-reading");
      const data = await response.json();
      setLatestReading(data); // Update the state with the latest reading

      // Check soil moisture and update plant health
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
      const response = await fetch("http://localhost:8080/api/last-watered");
      const data = await response.json();
      setLastWatered(data.timestamp); // Update the state with the last watered timestamp
    } catch (error) {
      console.error("Error fetching last watered timestamp:", error);
    }
  };

  // Set up the interval to fetch the latest reading every 10 seconds (10000ms)
  useEffect(() => {
    fetchLatestReading(); // Initial fetch
    const intervalId = setInterval(fetchLatestReading, 10000); // Fetch every 10 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchLastWatered(); // Initial fetch
    const intervalId = setInterval(fetchLastWatered, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Format the timestamp to show relative time like "Just Now", "1 hour ago", etc.
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const readingTime = new Date(timestamp);
    const diff = formatDistanceToNow(readingTime, { addSuffix: true });
    return diff;
  };

  const handleWateringToggle = async () => {
    try {
      // Send a request to the backend to update the command in the database
      const response = await fetch("http://localhost:8080/api/update-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: isWatering ? 0 : 1 }),
      });

      if (response.ok) {
        // If successful, toggle the watering state and show snackbar message
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

  const handleAutoWateringToggle = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auto-watering", {
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

  // Lock scroll when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isModalOpen]);

  const togglePlantHealth = () => {
    setIsHealthy(!isHealthy);
  };

  const handleOpenSettingsModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
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
            See Plant Care History
            <WaterDropSharpIcon sx={{ width: "0.5em", height: "auto" }} />
          </Button>
        </Box>
        {/* Plant Images Section */}
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
        {/* Toggle Button */}
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
            {/* Snackbar Button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained" // Change to "contained" to avoid the default border
                onClick={handleWateringToggle}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  backgroundColor: isWatering ? "#FF5722" : "#4DB30B",
                  color: "white",
                  fontWeight: "semibold",
                  padding: "10px 20px",
                  boxShadow: "none", // Remove shadow
                  border: "none", // Remove border
                  outline: "none", // Remove focus outline
                  "&:hover": {
                    backgroundColor: isWatering ? "#E64A19" : "#3E9109",
                    boxShadow: "none", // Remove shadow on hover
                  },
                  "&:focus": {
                    outline: "none", // Remove focus outline
                  },
                  "&:active": {
                    // Remove shadow on active
                  },
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
                            color: "#4CAF50", // Color when checked
                            "&:hover": {
                              backgroundColor: "rgba(76, 175, 80, 0.08)", // Background color when checked and hovered
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#4CAF50", // Track color when checked
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
            autoHideDuration={isFirstAlert ? null : 5000} // No auto-hide for the first alert
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
        {/* Statistics Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 8 }}>
          <StatisticsCard
            label="Temperature"
            icon={Temperature}
            value={
              latestReading ? `${latestReading.temperature} °C` : "Loading..."
            }
            valueStyle={{ fontSize: "24px", color: "#FF5722" }} // Custom value style
          />
          <StatisticsCard
            label="Soil Moisture"
            icon={SoilMoisture}
            value={
              latestReading ? `${latestReading.soil_moisture}%` : "Loading..."
            }
            valueStyle={{ fontSize: "24px", color: "#4CAF50" }} // Custom value style
          />
          <StatisticsCard
            label="Last Watered"
            icon={LastWatered}
            value={lastWatered ? formatTimestamp(lastWatered) : "Loading..."}
            valueStyle={{ fontSize: "20px", color: "#2196F3" }} // Custom value style
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
      </Box>
      {/* Settings Modal */}
      <SettingsModal open={isModalOpen} onClose={handleCloseModal} />
    </ThemeProvider>
  );
}
