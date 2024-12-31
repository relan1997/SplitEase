import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import axios from "axios";

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

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Serif JP", serif;
  }
`;

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

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 350px;
  background-color: #ffffff11;
  border: 1px solid #6a9c89;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #c4dad2;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #6a9c89;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  font-family: "Noto Serif JP", serif;
  transition: border-color 0.3s ease;

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
  font-family: "Noto Serif JP", serif;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  &:hover {
    background-color: #16423c;
    transform: scale(1.05);
  }
`;

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
        if (res.status === 200) {
          console.log("Login req sent to backend");
          const token = res.data.token;
          localStorage.setItem("authToken", token);
          navigate("/names");
        } else {
          console.log("Unexpected Error");
        }
      })
      .catch((err) => {
        if (err.response) {
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
          alert("Network error. Please check your connection and try again.");
        }
      });
  };

  return (
    <>
      <GlobalStyle />
      <FontPreconnect />
      <PageWrapper>
        <LoginBox>
          <Title>Login</Title>
          <Input
            placeholder="Enter the username"
            type="text"
            name="username"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Enter the Password"
            type="password"
            name="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton onClick={login}>Login</StyledButton>
          <StyledButton as={Link} to="/register">
            Register
          </StyledButton>
        </LoginBox>
      </PageWrapper>
    </>
  );
};

export default Login;
