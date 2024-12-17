import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SoilMoistureGuideModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="soil-moisture-guide-modal"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2, letterSpacing: "-0.06em" }}
        >
          Soil Moisture Guide
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ErrorOutlineIcon sx={{ color: "error.main", mr: 1 }} />
          <Typography variant="body1">
            0-30%: Bad soil moisture (Too dry)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <WaterDropIcon sx={{ color: "info.main", mr: 1 }} />
          <Typography variant="body1">31-70%: Average soil moisture</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircleOutlineIcon sx={{ color: "success.main", mr: 1 }} />
          <Typography variant="body1">71-100%: Good soil moisture</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SoilMoistureGuideModal;
