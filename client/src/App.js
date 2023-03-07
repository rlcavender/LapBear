import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import logo from "./LapBear_6_Transparent.png";

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <head>
        <title>LapBear ʕ •ᴥ•ʔ</title>
        <link rel="stylesheet" type="text/css" href="style.css"/>
      </head>
    </>
  );
}

export default App;