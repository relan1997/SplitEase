import React from "react";
import { useState } from "react";
import "./HomePage.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [error, setError] = useState("");
  const {
    register:signUpRegister,
    formState: { errors:errorsSignUp },
    handleSubmit:handleSignUp,
  } = useForm();

  const{
    register:signInRegister,
    formState:{errors:errorsSignIn},
    handleSubmit:handleSignIn,
  } = useForm();

  const navigate = useNavigate();
  const signUpFormSubmission = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sign-in",
        data
      );
      if (response) {
        navigate("/addInfo");
      }
      if (!response) throw new Error("There is some error");
      console.log(response);
    } catch (error) {
      console.error(error.response?.data, error);
    }
  };

  const signInFormSubmission = async (data) => {
    const { username, password } = data;
    console.log(username, password);
  };

  const getErrorMessage = (error) => {
    if (error) {
      switch (error.type) {
        case "required":
          return "This field is required";
        case "minLength":
          return `Minimum length is 8`;
        case "pattern":
          return "Password must contain one uppercase letter, one lowercase letter, one number, and one special character";
        default:
          return "Invalid input";
      }
    }
  };

  return (
    <div className="parent-layout">
      <div id="left-side" className="parent-div">
        <p>
          <span>Split-Easy</span>: Divide, Share, Simplify
        </p>
        <p>
          Splitease simplifies managing group expenses with its intuitive,
          user-friendly platform. Ideal for trips, outings, or shared bills, it
          offers real-time expense tracking and flexible splitting options to
          ensure everyone pays their fair share. Enjoy stress-free group
          finances and focus on what matters most—your time together.
        </p>
      </div>
      <div id="right-side" className="parent-div">
        <div>
          <div className="forms-left">
            <div className="login-left">
              <form onSubmit={handleSignUp(signUpFormSubmission)}>
                <input
                  type="text"
                  placeholder="Username"
                  {...signUpRegister("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  aria-invalid={errorsSignUp.username ? "true" : "false"}
                />
                {errorsSignUp.username && <p>{getErrorMessage(errorsSignUp.username)}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  {...signUpRegister("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  aria-invalid={errorsSignUp.password ? "true" : "false"}
                />
                {errorsSignUp.password && <p>{getErrorMessage(errorsSignUp.password)}</p>}

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div className="forms-right">
            <form onSubmit={handleSignIn(signInFormSubmission)}>
              <input
                type="text"
                placeholder="Username"
                {...signInRegister("username", {
                  required: "Username is required",
                })}
              />

              <input
                type="password"
                placeholder="Password"
                {...signInRegister("password", { required: "Password is required" })}
              />

              <button type="submit"> Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
