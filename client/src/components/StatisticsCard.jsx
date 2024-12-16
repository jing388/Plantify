import React from "react";
import { createTheme, ThemeProvider, Box, CssBaseline } from "@mui/material";
import { min } from "date-fns";

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
          minWidth: "15rem", // Sets minimum card size
          color: "black",
          alignItems: "center",
          wordWrap: "break-word", // Allows text to wrap
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
            wordWrap: "break-word", // Allows text to wrap
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
              fontWeight: "semiBold",
              marginTop: "5px",
              fontSize: "20px", // Scales responsively
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              letterSpacing: "-0.06em",
              color: "#97A167",
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
