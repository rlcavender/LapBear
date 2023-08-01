import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import UploadRaceData from "./pages/UploadRaceData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/UploadRaceData" element={<UploadRaceData />} />
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