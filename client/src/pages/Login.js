import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add code to create account
    navigate('/UploadRaceData');
  };

  return (
    <main>
      <div className="signup-container">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
