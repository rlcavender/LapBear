import React from "react";
import logo from "./LapBear_6_Transparent.png";
import "./App.css";

function App() {
  const [message, setMessage] = React.useState(null);
  const [raceData, setRaceData] = React.useState([]);

  React.useEffect(() => {
    fetch("/home")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  function handleStartRace() {
    fetch("/startRace")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }

  function handleEndRace() {
    setMessage("Returning LapBear data...");
    fetch("/endRace")
      .then((res) => res.json())
      .then((data) => setRaceData(JSON.parse(data.message)));
  }

  function displayRaceData() {
    return raceData.map((logItem) => <li>{logItem}</li>);
  }

  return (
    <div>
      <head>
        <title>LapBear ʕ •ᴥ•ʔ</title>
        <link rel="stylesheet" type="text/css" href="style.css"/>
      </head>
      <body>
        <header>
          <div class="logo-title">
            <img src={logo} alt="LapBear Logo" width="100" height="100"/>
            <h1>LapBear ʕ •ᴥ•ʔ</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#">Login</a></li>
				      <li><a href="#">Sign Up</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <h1>All your race data in one convenient place.</h1>
          <h2>Follow your path around the track.</h2>
          <p>View live data from your kart, including wheel movements, brake and acceleration data, lap times, and more.</p>
          <h2>Improve your lap times.</h2>
          <p>Use LapBear's data analysis tools to improve your lap times by viewing where you're losing time, whether you're hitting the apexes, and other information to help you up your game.</p>
          <h2>Connect with other LapBear racers.</h2>
          <p>Add friends, share your race results, upload photos and videos from race day, and find other drivers at your local track.</p>
        </main>
      </body>
    </div>
  );
}

export default App;