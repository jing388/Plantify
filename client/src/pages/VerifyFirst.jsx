import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import necessary theme functions
import logo from "../assets/plantify-logo.png"; // Import your logo
import mailIcon from "../assets/mail-icon.png"; // Import the mail icon

export default function EmailVerification() {
  const theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif", // Apply the font family
    },
    palette: {
      background: {
        default: "#F3F4EC", // Set the default background color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
              justifyContent: "space-between", // Space between left and right
              padding: "0 20px",
            }}
          >
            {/* Left side: Logo and 'Plantify' */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <img
                  src={logo}
                  alt="Plantify Logo"
                  style={{ height: 30, marginRight: 10 }}
                />
              </Link>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#2a2a2a",
                  fontWeight: "bold",
                  letterSpacing: "-0.06em",
                }}
              >
                Plantify.
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content Section */}
        <Box
          sx={{
            maxWidth: 400,
            margin: "0 auto",
            mt: 20,
            textAlign: "center",
          }}
        >
          {/* Mail Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <img src={mailIcon} alt="Mail Icon" style={{ height: 20 }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "medium",
              mb: 2,
              letterSpacing: "-0.06em",
            }}
          >
            Verify your email first!
          </Typography>

          {/* Body Text */}
          <Typography
            variant="body1"
            sx={{
              color: "#2a2a2a",
              mb: 3,
            }}
          >
            Please check your inbox for a verification email and click on the
            provided link to confirm your email address.
          </Typography>
          <Link to="/signin">
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#4db30b" }}
            >
              Back to Login
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
