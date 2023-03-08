const g = require('logitech-g29');
const fs = require('fs');
const path = require('path');

// Specify the directory where the file should be saved
const directory = path.join(__dirname, 'dataFiles');

// Create the directory if it doesn't exist
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// assemble filename in YY-MM-DD-HH-MM-SS format
const now = new Date();

const year = now.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
const month = ("0" + (now.getMonth() + 1)).slice(-2); // Add leading zero to the month
const day = ("0" + now.getDate()).slice(-2); // Add leading zero to the day
const hour = ("0" + now.getHours()).slice(-2); // Add leading zero to the hour
const minute = ("0" + now.getMinutes()).slice(-2); // Add leading zero to the minute
const second = ("0" + now.getSeconds()).slice(-2); // Add leading zero to the second

const dateTime = `${year}-${month}-${day}-${hour}-${minute}-${second}`;

console.log(dateTime);

// Specify the file path
const filePath = path.join(directory, 'sampleRaceData.txt');

var data = "";

module.exports = {
  connectLapBear: function () {
    try {
      g.connect();
      gatherRaceData(1);
      return "Gathering race data from LapBear...";
    } catch (err) {
      return "LapBear encountered a connection error: " + err.message + ". Please make sure your LapBear device is plugged in.";
    }
  },

  disconnectLapBear: function () {
    try {
      g.disconnect();
      return gatherRaceData(0);
    } catch (err) {
      return "LapBear encountered an error when attempting to disconnect: " + err.message;
    }
  }
}

function gatherRaceData(active) {
  if (active) {
    data = "[";
    gear = 0
    g.on("pedals-gas", function(val) {
      g.leds(val);
    })
    g.on("wheel-turn", function(val) {
      data += "\"Wheel turned to " + val + "\",";
    })
    g.on("wheel-shift_right", function(val) {
      if (val) {
        gear += val;
        if(gear > 8) {
          gear = 8;
        } else {
          data += "\"Shifted into " + gear + "\",";
        }
      }
    })
    g.on("wheel-shift_left", function(val) {
      if (val) {
        gear -= val;
        if(gear < 0) {
          gear = 0;
        } else {
          data += "\"Shifted into " + gear + "\",";
        }
      }
    })
  } else {
    data = data.substring(0, data.length - 1);
    data += "]";
    // Create a new file with the specified name and write some text to it
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err;
    });
    return data;
  }
  return data;
}