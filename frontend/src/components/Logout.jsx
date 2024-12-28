import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Logout;
