import React from "react";
import { useState } from "react";
import "./AddInfo.css";
import Navbar from "../Navbar/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AddInfo = ({ username }) => {
  const [invalid, setInvalid] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [name1, setName1] = useState("");
  const [amt, setAmt] = useState(0);
  const [name2, setName2] = useState("");

  const submitInfo = () => {
    if (name1.trim() === "" || name2.trim() === "" || amt <= 0 || amt==='') {
      setInvalid("Info isn't Valid");
    } else {
      const statement = `${name1.charAt(0).toUpperCase() + name1.slice(1)} owes ${amt} to ${name2.charAt(0).toUpperCase() + name2.slice(1)}`;
      setTransactions((prev) => {
        return [...prev, statement];
      });
      setName1("");
      setAmt(0);
      setName2("");
      setInvalid("");
    }
  };

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
          <input
            type="text"
            placeholder="Name1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <input
            type="number"
            id="amt"
            placeholder="Amount"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name2"
            id="third-input"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
        <div className="button-div-info">
          <button id="Add" onClick={submitInfo}>
            Add
          </button>
          {invalid.length > 0 && <div className="invalid-box-info">{invalid}</div>}
        </div>
        <div className="transaction-list">
          {transactions.length > 0 &&
            transactions.map((item, ind) => {
              return (
                <div key={ind}>
                  {item}<br/>
                  <span className="edit-btn-info"><EditIcon style={{ color: '#4B70F5' }} /></span>
                  <span className="delete-btn-info"><DeleteIcon style={{ color: '#ff0033' }} /></span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AddInfo;
