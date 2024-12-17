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
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../assets/plantify-logo.png";
import plant from "../assets/plant-midgit.png";
import googleLogo from "../assets/google.png";

// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgm48NDdkmQg1G8JUgMgs0EyvBDgxT79o",
  authDomain: "plantify-3b3a9.firebaseapp.com",
  projectId: "plantify-3b3a9",
  storageBucket: "plantify-3b3a9.appspot.com",
  messagingSenderId: "267170335326",
  appId: "1:267170335326:web:d80e2649e4f88703f102cf",
  measurementId: "G-971P0QZETG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function Header() {
  const navigate = useNavigate();
  const theme = createTheme({
    typography: { fontFamily: "Inter, sans-serif" },
    palette: { background: { default: "#F3F4EC" } },
  });

  // States
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [googleError, setGoogleError] = React.useState("");

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

  // Google Sign-Up Handler
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    setGoogleError(""); // Clear previous Google error message

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user in Firestore if new
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        username: user.displayName || "Google User",
        email: user.email,
        isVerified: user.emailVerified,
        createdAt: new Date(),
      });

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      // Set specific error messages based on error codes
      if (error.code === "auth/email-already-in-use") {
        setGoogleError("Email already in use. Please try another account.");
      } else {
        setGoogleError("An error occurred during Google sign-in. Please try again.");
      }
    }
  };

  // Manual Sign-Up Handler
  const handleManualSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    if (!validate()) return;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user data in Firestore (excluding password)
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        isVerified: user.emailVerified,
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(user);

      navigate("/verify-email"); // Redirect to verification page
    } catch (error) {
      console.error("Manual Sign-Up Error:", error.message);
      
      // Set specific error messages based on error codes
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("The email address is already in use by another account.");
          break;
        case "auth/invalid-email":
          setErrorMessage("The email address is not valid.");
          break;
        case "auth/weak-password":
          setErrorMessage("The password is too weak. It should be at least 6 characters.");
          break;
        default:
          setErrorMessage("An error occurred during sign-up. Please try again.");
          break;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mt: 3, mx: 2 }}>
        <AppBar
          position="sticky"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
                sx={{ color: "#2a2a2a", fontWeight: "bold" }}
              >
                Plantify.
              </Typography>
            </Box>
            <Link to="/signin">
              <Button variant="text" sx={{ color: "#2a2a2a" }}>
                Sign In
              </Button>
            </Link>
          </Toolbar>
        </AppBar>

        <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 2, position: "relative" }}>
  <Stack spacing={2}>
    {/* Displaying Google sign-in errors */}
    {googleError && (
      <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
        {googleError}
      </Alert>
    )}
    {/* Displaying manual sign-up errors */}
    {errorMessage && (
      <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
        {errorMessage}
      </Alert>
    )}
    <Box sx={{ textAlign: "center" }}>
      <img
        src={plant}
        alt="plant"
        style={{ height: 30, marginBottom: 10 }}
      />
      <Typography variant="h4" sx={{ fontWeight: "medium" }}>
        Create Account
      </Typography>
    </Box>
    <form onSubmit={handleManualSignUp}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#4db30b" }}
        >
          Sign Up
        </Button>
      </Stack>
    </form>
    <Divider>or</Divider>
    <Button
      onClick={handleGoogleSignUp}
      variant="outlined"
      sx={{ color: "#4db30b" }}
    >
      <img
        src={googleLogo}
        alt="Google"
        style={{ height: 20, marginRight: 10 }}
      />
      Sign Up with Google
    </Button>
  </Stack>
</Box>
      </Box>
    </ThemeProvider>
  );
}
