import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // Import the Firebase functions
import "./SignUpPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState(""); // State to hold the response message

  // Email validation function
  const validateEmail = (inputEmail) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(inputEmail);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setMessage(""); // Clear previous messages

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object

      // Send verification email
      await sendEmailVerification(user);

      setMessage("User registered successfully! A verification email has been sent.");

      // Reset form fields
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          {emailError && <p className="error">{emailError}</p>}

          {/* Name Field */}
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />

          {/* Password Field */}
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          {/* Confirm Password Field */}
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />

          {/* Submit Button */}
          <button type="submit">Sign Up</button>
        </form>

        {/* Display messages */}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
