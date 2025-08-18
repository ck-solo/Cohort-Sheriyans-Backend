// In app.js (backend)
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const songModel = require("./models/mood.model"); // adjust path if needed

app.use(cors());

// Your existing route
app.post("/api/expression", (req, res) => {
  console.log("Received expression:", req.body);
  res.status(200).json({ message: "Expression received", data: req.body });
});

// Add songs GET route
app.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;  // get ?mood=happy
    const songs = await songModel.find({ mood }); // fetch from MongoDB
    res.status(200).json({ message: "Songs fetched success", songs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching songs", error: err });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
