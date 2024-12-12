import React from "react";
import { createTheme, ThemeProvider, Box, CssBaseline } from "@mui/material";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function StatisticsCard({ label, icon, value }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes styles across browsers */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "20rem", // Limits overall card size
          minWifth: "20rem", // Ensures card doesn't shrink too much
          color: "black",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "1 / 1", // Makes it a square
            width: "100%", // Responsive width
            minWidth: "200px", // Restricts min size
            height: "auto", // Allows height to adjust
            borderRadius: "10px",
            border: "1.5px solid #2a2a2a",
            backgroundColor: "#E9EBDF",
            padding: "16px", // Adjusts inner spacing
            boxSizing: "border-box", // Ensures padding doesn't break sizing
          }}
        >
          <img
            loading="lazy"
            src={icon}
            alt={`${label} icon`}
            style={{
              width: "30px",
              height: "30px",
              objectFit: "contain",
            }}
          />
          <Box
            role="heading"
            aria-level="2"
            style={{
              marginTop: "16px",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)", // Scales responsively
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: "-0.06rem",
              color: "#2a2a2a",
            }}
          >
            {label}
          </Box>
          <Box
            aria-live="polite"
            style={{
              marginTop: "5px",
              fontSize: "30px", // Scales responsively
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              letterSpacing: "-0.06em",
              color: "#2a2a2a",
            }}
          >
            {value}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default StatisticsCard;
