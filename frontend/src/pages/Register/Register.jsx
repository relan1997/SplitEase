import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Serif JP', serif;
  }
`;

const FontPreconnect = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&display=swap"
      rel="stylesheet"
    />
  </>
);

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(270deg, #16423c, #6a9c89);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: #e9efec;
`;

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;


const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #c4dad2;
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
`;

const Input = styled.input`
  width: 300px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #6a9c89;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  &:focus {
    border-color: #16423c;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #6a9c89;
  color: #e9efec;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16423c;
    transform: scale(1.05);
  }
     font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:8080/register", { username, password })
      .then((res) => {
        alert("Registration successful! Logging you in...");
        return axios.post("http://localhost:8080/login", {
          username,
          password,
        });
      })
      .then((res) => {
        console.log("Login successful");
        localStorage.setItem("authToken", res.data.token);
        navigate("/names");
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
      <FontPreconnect />
      <GlobalStyle />
      <PageWrapper>
        <RegisterBox>
          <Title>Register</Title>
          <Input
            placeholder="Enter the username"
            type="text"
            name="username"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Enter the password"
            type="password"
            name="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton onClick={register}>Register</StyledButton>
          <StyledButton as={Link} to="/login">
            Login
          </StyledButton>
        </RegisterBox>
      </PageWrapper>
    </>
  );
};

export default Register;
