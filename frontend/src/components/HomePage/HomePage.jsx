import React from "react";
import { useState } from "react";
import "./HomePage.css";
const HomePage = () => {
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState('');
  return (
    <div className="parent-layout">
      <div id="left-side" className="parent-div">
        <p>
          <span>Split-Easy</span>:Divide, Share, Simplify
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
        <div className="forms">
          <div className="login">
            <form action="/login">
              <div className="login-flex">
                <div className="username">
                  <input
                    type="text"
                    value={username}
                    placeholder="Enter Your Username"
                    onChange={(e)=>setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={password}
                    placeholder="Enter Your Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="button">
                  <button>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
