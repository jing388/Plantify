import * as React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/plantify-logo.png"; // Import your logo
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        setIsModalOpen(false); // Close modal after successful sign-out
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
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

            {/* Right side: Logout Icon */}
            {auth && (
              <IconButton
                size="large"
                aria-label="logout"
                onClick={handleOpenModal} // Open modal on click
                color="inherit"
              >
                <ExitToAppIcon sx={{ color: "#2a2a2a" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ padding: 2 }}>
        <DialogTitle
          sx={{
            fontWeight: "semiBold",
            fontFamily: "Inter, sans-serif",
            color: "#2a2a2a",
            letterSpacing: "-0.06em",
          }}
        >
          Are you sure you want to log out?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#2a2a2a", padding: 1 }}>
            You will be logged out of your current session.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{
              color: "#4caf50",
              textTransform: "none",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#388e3c", boxShadow: "none" },
            }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
