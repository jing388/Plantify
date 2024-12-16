import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import necessary theme functions
import logo from "../assets/plantify-logo.png"; // Import your logo
import plant from "../assets/plant-midgit.png"; // Import your plant image
import googleLogo from "../assets/google.png"; // Import Google logo

export default function Header() {
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

  // State for form fields and errors
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [errors, setErrors] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Validation function
  const validate = () => {
    let valid = true;
    let newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form if validation passes
      console.log("Form submitted");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Apply the theme to the component */}
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

            {/* Right side: Sign In Text Button */}
            <Link to="/signin" style={{ fontWeight: "bold" }}>
              <Button
                variant="text" // Use text variant for a text button
                sx={{
                  color: "#2a2a2a", // Text color
                  textTransform: "none", // Disable uppercase text
                }}
              >
                Sign In
              </Button>
            </Link>
          </Toolbar>
        </AppBar>

        {/* Form Section */}
        <Box
          sx={{ maxWidth: 400, margin: "0 auto", mt: 1, alignItems: "center" }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={plant}
                alt="plant"
                style={{ height: 30, marginRight: 10 }}
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "medium",
                  mb: 4,
                  alignItems: "center",
                  letterSpacing: "-0.06em",
                }}
              >
                Create Account
              </Typography>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              {/* Email TextField */}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />

              {/* Username TextField */}
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />

              {/* Password TextField */}
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />

              {/* Confirm Password TextField */}
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />

              {/* Sign Up Button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#4db30b", // Set the color for the button
                  borderRadius: "5px", // Rounded button
                  color: "white", // White text color
                  textTransform: "none", // Keep text in normal case
                  mt: 2,
                  height: 50,
                }}
              >
                Sign Up
              </Button>

              {/* OR Divider */}
              <Typography>
                <Divider>or</Divider>
              </Typography>

              {/* Sign Up with Google Button */}
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4db30b", // Border color
                  borderRadius: "5px", // Rounded button
                  color: "#4db30b", // Text color
                  textTransform: "none", // Keep text in normal case
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  style={{ height: 20, marginRight: 10 }}
                />
                Sign Up with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
