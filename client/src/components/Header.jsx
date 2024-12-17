import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/plantify-logo.png"; // Import your logo
import SettingsModal from "./SettingsModal"; // Import your modal component
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [username, setUsername] = useState("Loading..."); // State to hold the username

  // Fetch the current user's details
  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email || "User"); // Use display name, email, or fallback
      } else {
        setUsername("Guest"); // If no user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleOpenSettingsModal = () => {
    setIsModalOpen(true); // Open the settings modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3, mx: 2 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent", // Transparent background
          boxShadow: "none", // Remove box shadow
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* Left side: Logo and 'Plantify' */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Plantify Logo"
              style={{ height: 30, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Inter, sans-serif",
                color: "#2a2a2a",
                fontWeight: "bold",
                letterSpacing: "-0.06em",
              }}
            >
              Plantify.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Username Display */}
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontFamily: "Inter, sans-serif",
                color: "#2a2a2a",
                marginRight: 2,
              }}
            >
              {username}
            </Typography>

            {/* Right side: Profile Icon */}
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={handleOpenSettingsModal} // Open modal on click
              color="inherit"
            >
              <ExitToAppIcon sx={{ color: "#2a2a2a" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Settings Modal */}
      <SettingsModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
}
