import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
    axios
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Login req sent to backend");
          const token = res.data.token;
          localStorage.setItem("authToken", token);
          navigate("/");
        } else {
          console.log("Unexpected Error");
        }
      })
      .catch((err) => {
        if (err.response) {
          // Handle known status codes
          switch (err.response.status) {
            case 400:
              alert("Bad request. Please check your input and try again.");
              break;
            case 401:
              alert(
                err.response.data.error ||
                  "Authentication failed. Please try again."
              );
              break;
            case 500:
              alert("Internal server error. Please try again later.");
              break;
            default:
              alert(
                `Unexpected error: ${err.response.status}. Please try again later.`
              );
          }
        } else {
          // Handle network or unexpected errors
          alert("Network error. Please check your connection and try again.");
        }
      });
  };

  return (
    <>
      <h1>Login Page</h1>
      <div className="login-body">
        <div className="username-login">
          Login:
          <input
            placeholder="Enter the username"
            type="text"
            name="username"
            id="login-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="password-login">
          Password:
          <input
            placeholder="Enter the Password"
            type="password"
            name="password"
            value={password}
            id="login-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={login}>Login</button>
      </div>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
