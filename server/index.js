const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const lapBear = require("./lapBear");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests
app.get("/home", (req, res) => {
  res.json({ message: "LapBear! vroom vroom ʕ •ᴥ•ʔ" });
});

app.get("/startRace", (req, res) => {
  var data = lapBear.connectLapBear();
  res.json({ message: data });
});

app.get("/endRace", (req, res) => {
  var data = lapBear.disconnectLapBear();
  res.json({ message: data });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});