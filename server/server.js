const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"], // Frontend URL
};

app.use(cors(corsOptions));

// Fruits endpoint (example)
app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana", "cherry"] });
});

// Use weather routes
app.use("/api", weatherRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
