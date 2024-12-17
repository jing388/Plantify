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
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../assets/plantify-logo.png";
import plant from "../assets/plant-midgit.png";
import googleLogo from "../assets/google.png";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase"; // Ensure that auth is imported correctly
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions as needed

export default function SignInPage() {
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

  // State for form fields and errors
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [googleError, setGoogleError] = React.useState(""); // Added state for Google error messages
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  // Validation function
  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (!user.emailVerified) {
          navigate("/verify-first");
          return;
        }
        console.log("Sign-in successful, user: ", user);
        navigate("/dashboard"); // Redirect user to dashboard or another page
      } catch (error) {
        console.error("Error during sign-in: ", error);
        setErrors({ ...errors, password: "Invalid email or password" });
      }
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    setGoogleError(""); // Clear previous Google error message

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // If user does not exist, save them to Firestore
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          username: user.displayName || "Google User",
          email: user.email,
          isVerified: user.emailVerified,
          createdAt: new Date(),
        });
      }

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error during Google sign-in: ", error);
      setGoogleError("Failed to sign in with Google. Please try again."); // Display error message
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mt: 3, mx: 2 }}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
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
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              <Button
                variant="text"
                sx={{ color: "#2a2a2a", textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Link>
          </Toolbar>
        </AppBar>

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
                Sign in
              </Typography>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
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
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#4db30b",
                  borderRadius: "5px",
                  color: "white",
                  textTransform: "none",
                  mt: 2,
                  height: 50,
                }}
              >
                Sign In
              </Button>
              {googleError && (
                <Typography color="error" variant="body2">
                  {googleError}
                </Typography>
              )}
              <Divider>
                <Box sx={{ textAlign: "center" }}>
                  <Typography>or</Typography>
                </Box>
              </Divider>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4db30b",
                  borderRadius: "5px",
                  color: "#4db30b",
                  textTransform: "none",
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleGoogleSignIn}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  style={{ height: 20, marginRight: 10 }}
                />
                Sign In with Google
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#4db30b",
                  textTransform: "none",
                  mt: 1,
                  fontSize: "0.9rem",
                }}
                component={Link}
                to="/forgot-password"
              >
                Forgot Password?
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
