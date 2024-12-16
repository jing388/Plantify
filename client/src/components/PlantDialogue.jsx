import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const randomMessages = [
  "I'm doing great!",
  "What a lovely day!",
  "Thanks for taking care of me!",
  "I'm growing strong!",
  "The weather is nice!",
];

export function PlantDialogue({ moisture, sx }) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (moisture < 50) {
      setMessage("Water me!");
    } else if (moisture > 90) {
      setMessage("I'm full, Thanks!");
    } else {
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      setMessage(randomMessages[randomIndex]);
    }
  }, [moisture]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        px: 3,
        py: 1.5,
        bgcolor: "#E2E2E0",
        borderRadius: 4,
        textAlign: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: 16,
          height: 16,
          bgcolor: "#E2E2E0",
          transform: "translate(-50%, 50%) rotate(45deg)",
        },
        ...sx,
      }}
    >
      <Typography variant="body1" fontWeight="medium">
        {message}
      </Typography>
    </Box>
  );
}
