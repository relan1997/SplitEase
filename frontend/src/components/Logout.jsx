import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled,{keyframes} from 'styled-components'

const buttonHover = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledLogout = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
    animation: ${buttonHover} 0.5s;
  }
`;

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "http://localhost:8080/logout",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("User has been Logged Out");
          localStorage.removeItem("authToken");

          // Clear sessionStorage
          sessionStorage.clear();

          // Navigate to login page
          navigate("/login");
        } else {
          console.log("Error in logging out the User");
        }
      })
      .catch((err) => {
        console.log("Some Error", err);
      });
  };

  return <StyledLogout onClick={logout}>Logout</StyledLogout>;
};

export default Logout;
