import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Firebase Auth imports
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // State for email
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const auth = getAuth(); // Initialize Firebase Auth

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setSuccessMessage("Password reset link sent! Please check your inbox.");
    } catch (error) {
      console.error("Error during password reset:", error);
      let errorMsg = "An error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMsg = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Invalid email format.";
      }
      setErrorMessage(errorMsg);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 5 }}>
      <Stack spacing={2}>
        <Typography variant="h4" align="center" mb={2}>
          Reset Password
        </Typography>

        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          error={!!errorMessage} 
          helperText={errorMessage || " "} 
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit} 
          sx={{
            backgroundColor: "#4db30b",
            textTransform: "none",
            height: 50,
            color: "white",
          }}
        >
          Send Reset Link
        </Button>

        {successMessage && (
          <Typography sx={{ color: "green", mt: 2 }}>{successMessage}</Typography>
        )}

        {errorMessage && (
          <Typography sx={{ color: "red", mt: 2 }}>{errorMessage}</Typography>
        )}

        {/* Conditional render of "Back to Sign In" link after success */}
        {successMessage && (
          <Link to="/signin" style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              variant="text"
              sx={{
                color: "#4db30b", 
                textTransform: "none", 
                width: "100%", 
              }}
            >
              Back to Sign In
            </Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
}
