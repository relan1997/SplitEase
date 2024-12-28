import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Register the user
    axios
      .post("http://localhost:8080/register", { username, password })
      .then((res) => {
        alert("Registration successful! Logging you in...");
        // Automatically log in the user after successful registration
        return axios.post("http://localhost:8080/login", { username, password });
      })
      .then((res) => {
        console.log("Login successful");
        localStorage.setItem("authToken", res.data.token); // Save the JWT token
        navigate("/names"); // Redirect to the home page
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              alert("Invalid input. Please fill in all fields.");
              break;
            case 409:
              alert("Username already exists. Please choose another one.");
              break;
            case 401:
              alert("Authentication failed. Please try again.");
              break;
            case 500:
              alert("An error occurred. Please try again later.");
              break;
            default:
              alert("Unexpected error. Please try again later.");
              console.log(err);
          }
        } else {
          alert("Network error. Please check your connection.");
        }
      });
  };

  return (
    <>
      <h1>Register Page</h1>
      <div className="register-body">
        <div className="username-register">
          Username:
          <input
            placeholder="Enter the username"
            type="text"
            name="username"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-register">
          Password:
          <input
            placeholder="Enter the password"
            type="password"
            name="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={register}>Register</button>
      </div>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Register;
