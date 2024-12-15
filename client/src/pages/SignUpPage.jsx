import React, { useState } from "react";
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
      // Send the email and name to the backend for verification
      const response = await fetch("http://localhost:5000/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }), // Send email and name to backend
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Show success message from backend
      } else {
        setMessage("There was an error sending the verification email.");
      }
    } catch (error) {
      setMessage("Error: Unable to send the verification email.");
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