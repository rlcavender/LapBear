const g = require('logitech-g29');

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
    return data;
  }
  return data;
}