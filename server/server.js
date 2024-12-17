const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const weatherRoutes = require("./routes/weather");

const app = express();
const corsOptions = {
  origin: ["ttps://darkgreen-pelican-362860.hostingersite.com"], // Frontend URL
};

app.use(cors(corsOptions));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "sensor_data", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Endpoint to get the latest data
app.get("/api/latest-reading", (req, res) => {
  const query = "SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
    res.json(results[0]); // Send the latest row
  });
});

app.get("/api/last-watered", (req, res) => {
  const query =
    "SELECT timestamp FROM pump_control ORDER BY timestamp DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pump control timestamp:", err);
      res.status(500).json({ error: "Failed to fetch pump control timestamp" });
      return;
    }
    res.json(results[0]); // Send the latest timestamp
  });
});

// Endpoint to update the command
app.post("/api/update-command", (req, res) => {
  const { command } = req.body; // Get the command from the request body

  if (command !== 0 && command !== 1) {
    return res.status(400).json({ error: "Invalid command value" });
  }

  const query = "UPDATE pump_control SET command = ? WHERE id = 1"; // Assuming id = 1 for simplicity

  db.query(query, [command], (err, result) => {
    if (err) {
      console.error("Error updating command:", err);
      return res.status(500).json({ error: "Failed to update command" });
    }

    res.status(200).json({ message: "Command updated successfully" });
  });
});

app.post("/api/auto-watering", (req, res) => {
  const { automatic } = req.body; // Get the toggle state from the request body

  if (automatic !== 0 && automatic !== 1) {
    return res.status(400).json({ error: "Invalid automatic value" });
  }

  const query = "UPDATE automatic_watering SET automatic = ? WHERE id = 1"; // Assuming id = 1 for simplicity

  db.query(query, [automatic], (err, result) => {
    if (err) {
      console.error("Error updating auto-watering state:", err);
      return res
        .status(500)
        .json({ error: "Failed to update auto-watering state" });
    }

    res
      .status(200)
      .json({ message: "Auto-watering state updated successfully" });
  });
});

// Use weather routes
app.use("/api", weatherRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const path = require("path");

// Serve static files from the React dist folder
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all route to serve the React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
