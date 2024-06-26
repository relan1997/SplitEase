import React from "react";
import { useState } from "react";
import "./AddInfo.css";
const AddInfo = ({ username }) => {
  return (
    <div className="parent-div-info">
      <div className="left-div-info">
        <p>Welcome {username}</p>
        <p id="desc">
          Please fill in the input boxes below with the name of the person who
          owes money, the amount they owe, and the name of the person they owe
          the money to. Note: You have 6 input fields available before
          submission.
        </p>
        <div id="input-boxes-info">
          <div id="input-fields-info">
            {[1, 1, 1, 1, 1, 1].map((item) => (
              <div id="input-elements-info">
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </div>
            ))}
          </div>
          <div id="input-btn-info">
            <button id="add-input-btn">+</button>
          </div>
        </div>
      </div>
      <div className="right-div-info">Right</div>
    </div>
  );
};

export default AddInfo;
