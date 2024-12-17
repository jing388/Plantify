import * as React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/plantify-logo.png"; // Import your logo
import SettingsModal from "./SettingsModal"; // Import your modal component

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility

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
            {/* Username Text Holder */}
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontFamily: "Inter, sans-serif",
                color: "#2a2a2a",
                marginRight: 2,
              }}
            >
              Username
            </Typography>

            {/* Right side: Profile Icon */}
            {auth && (
              <IconButton
                size="large"
                aria-label="account of current user"
                onClick={handleOpenSettingsModal} // Open modal on click
                color="inherit"
              >
                <ExitToAppIcon sx={{ color: "#2a2a2a" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Settings Modal */}
      <SettingsModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
}
