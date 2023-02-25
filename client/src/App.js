import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/home")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function handleClick(route) {
    fetch(route)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => { handleClick("/startRace") }}>Start Race</button>
        <button onClick={() => { handleClick("/endRace") }}>End Race</button>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;