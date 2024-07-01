import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import "./AddInfo.css";
import Navbar from "../Navbar/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { loadState } from "../../store/sessionMethods";
import {useDispatch} from 'react-redux'
import { addToState,removeFromState, updateState } from "../../store/storeSlice";

const AddInfo = ({ username }) => {
  const [invalid, setInvalid] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [name1, setName1] = useState("");
  const [amt, setAmt] = useState(0);
  const [name2, setName2] = useState("");
  const [isEdit,setIsEdit] = useState(-1)

  const dispatch = useDispatch();
  useEffect(()=>{
    const curr_transactions = loadState('INDT20WC_290624','')
    setTransactions(curr_transactions);
  },[])


  const addEditCredentials = (ind)=>{
    const statement=transactions[ind];
    const arr=statement.split(' ');
    console.log(arr[0],arr[2],arr[4]);
    setName1(arr[0]);
    setAmt(arr[2]);
    setName2(arr[4]);
    setIsEdit(ind);
  }

  const editInfo = ()=>{
    if (name1.trim() === "" || name2.trim() === "" || amt <= 0 || amt==='') {
      setInvalid("Info isn't Valid");
    }else {
      const statement = `${name1.charAt(0).toUpperCase() + name1.slice(1)} owes ${Number(amt)} to ${name2.charAt(0).toUpperCase() + name2.slice(1).trim( )}`;
      dispatch(updateState({data:statement,ind:isEdit}))
      setTransactions((prev)=>{
        return prev.map((item,ind)=> ind === isEdit?statement:item)
      })
      setIsEdit(-1);
      setName1("");
      setAmt(0);
      setName2("");
      setInvalid("");
    }
  }

// ***********************************************************************************************
// FIX THE SPACE NAMED ERRORS
//***********************************************************************************************

  const submitInfo = useCallback(() => {
    if (name1.trim() === "" || name2.trim() === "" || amt <= 0 || amt==='') {
      setInvalid("Info isn't Valid");
    } else {
      const statement = `${name1.charAt(0).toUpperCase() + name1.slice(1)} owes ${amt} to ${name2.charAt(0).toUpperCase() + name2.slice(1)}`;
      dispatch(addToState({id:'',data:statement}));
      setTransactions((prev) => {
        return [...prev, statement];
      });
      setName1("");
      setAmt(0);
      setName2("");
      setInvalid("");
    }
  },[name1,name2])

  const deleteItem = (index)=>{
    console.log(index);
    
    dispatch(removeFromState({ind:index}))
    setTransactions((prev)=>{
      return prev.filter((item,ind)=>ind !== index)
    })
  }

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
          <button id="Add" onClick={ isEdit!=-1?editInfo:submitInfo}>
            Add
          </button>
          {invalid.length > 0 && <div className="invalid-box-info">{invalid}</div>}
        </div>
        <div className="transaction-list">
          {transactions.length  > 0 &&
            transactions.map((item, ind) => {
              return (
                <div key={ind}>
                  {item}<br/>
                  <span className="edit-btn-info" onClick={()=>addEditCredentials(ind)}><EditIcon style={{ color: '#4B70F5' }} /></span>
                  <span className="delete-btn-info" onClick={()=>deleteItem(ind)}><DeleteIcon style={{ color: '#ff0033' }} /></span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AddInfo;
