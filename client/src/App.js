import React from "react";
import logo from "./logo.svg";
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => { handleStartRace() } }>Start Race</button>
        <button onClick={() => { handleEndRace() } }>End Race</button>
        <p>{!message ? "Loading..." : message}</p>
        <ul>{!raceData ? "" : displayRaceData()}</ul>
      </header>
    </div>
  );
}

export default App;