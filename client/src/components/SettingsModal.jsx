import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    color: "black",
  },
  palette: {
    background: {
      default: "#F0F1EA",
    },
  },
});

const SettingsModal = ({ open, onClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ ...modalStyle }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginY={3}
            marginBottom={6}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "medium",
                letterSpacing: "-0.06em",
              }}
            >
              My Profile
            </Typography>
            <Button
              onClick={onClose}
              sx={{ color: "black", minWidth: 0, padding: 0 }}
            >
              <CloseIcon />
            </Button>
            {/* Your modal content goes here */}
          </Stack>
          <Stack spacing={4}>
            <Typography>Name</Typography>
            <Typography>Email</Typography>
            <Typography>Password</Typography>
            <Typography>Logout</Typography>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 8,
};

export default SettingsModal;
