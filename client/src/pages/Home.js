import React from "react";

function Home() {
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
      <main>
        <h1>All your race data in one convenient place.</h1>
        <h2>Follow your path around the track.</h2>
        <p>View live data from your kart, including wheel movements, brake and acceleration data, lap times, and more.</p>
        <h2>Improve your lap times.</h2>
        <p>Use LapBear's data analysis tools to improve your lap times by viewing where you're losing time, whether you're hitting the apexes, and other information to help you up your game.</p>
        <h2>Connect with other LapBear racers.</h2>
        <p>Add friends, share your race results, upload photos and videos from race day, and find other drivers at your local track.</p>
        <button onClick={() => { handleStartRace() } }>Start Race</button>
        <button onClick={() => { handleEndRace() } }>End Race</button>
        <p>{!message ? "Loading..." : message}</p>
        <ul>{!raceData ? "" : displayRaceData()}</ul>
      </main>
    </div>
  );
}
  
export default Home;