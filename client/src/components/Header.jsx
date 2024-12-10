import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../assets/plantify-logo.png"; // Import your logo

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3, mx: 2 }}>
      {" "}
      {/* Added mx: 2 for margin on both sides */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent", // Transparent background
          boxShadow: "none", // Remove box shadow
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* Left side: Logo and 'Plantify' */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Plantify Logo"
              style={{ height: 30, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Inter, sans-serif",
                color: "#2a2a2a",
                fontWeight: "bold",
                letterSpacing: "-0.06em",
              }}
            >
              Plantify.
            </Typography>
          </Box>

          {/* Right side: Profile Icon */}
          {auth && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle sx={{ color: "#2a2a2a" }} />
            </IconButton>
          )}

          {/* Profile Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
