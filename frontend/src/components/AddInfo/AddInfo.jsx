import React from "react";
import { useState } from "react";
import "./AddInfo.css";
import Navbar from "../Navbar/Navbar";
const AddInfo = ({ username }) => {
  return (
    <>
      <Navbar />
      <div className="parent-div-info">
        <div className="greeting-info">
          <h1>Welcome {username}</h1>
        </div>
        <div className="steps-info">
          Please enter the information in the input boxes below. First, input
          the name of the person who owes money. Then, enter the amount they
          owe. Finally, provide the name of the person to whom the money is
          owed.
        </div>
        <div className="input-boxes-info">
          <input type="text" placeholder="Name1" />
          <input type="text" id="amt" placeholder="Amount" />
          <input type="text" placeholder="Name2" id='third-input'/>
        </div>
        <div className="button-div-info">
          <button id='Add'>Add</button>
        </div>
      </div>
    </>
  );
};

export default AddInfo;
