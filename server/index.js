const path = require("path");
const express = require("express");
const fs = require("fs");
const http = require('http');
const WebSocket = require('ws');
const g = require('logitech-g29');

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const lapBear = require("./lapBear");

wss.on('connection', (ws) => {
  console.log("connected");
  // This is where you can handle the data stream to the client.
  // You might want to set up a loop to send data continuously.

  ws.on('message', (message) => {
    message = message.toString();
    console.log(message);
    if (message === 'start') {
      console.log("starting data stream");
      g.connect();
      // Start sending data to the client continuously
      const interval = setInterval(() => {
        g.once("wheel-turn", function(val) {
          ws.send(0 + " " + val);
        })
        g.once("pedals-gas", function(val) {
          ws.send(1 + " " + (val * 100));
        })
        g.once("pedals-brake", function(val) {
          ws.send(2 + " " + (val * 100));
        })
      }, 50); // Adjust the interval as needed

      ws.on('close', () => {
        clearInterval(interval);
      });
    } else if (message === 'end') {
      console.log("ending data stream");
      g.disconnect();
      // Client requested to stop the stream
      ws.close();
    }
  });
});

server.listen(8080, () => {
  console.log('WebSocket server listening on port 8080');
});

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

var i = 0;
app.get("/getData", (req, res) => {
  data = i.toString();
  res.json({ message: data });
  i++;
});

app.get("/endStream", (req, res) => {
  i = 0;
  res.json({ message: "0" })
});

app.get("/sampleFile", (req, res) => {
  fs.readFile(path.resolve(__dirname, "./dataFiles/BahrainLapv5.txt"), function (err, data) {
    data = data.toString('utf-8');
    res.json({ contents: data });
}) 
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});