import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const result = location.state?.result; // Access the result from state
    const [transactions,setTransactions] = useState([])
  useEffect(()=>{
    console.log(result.transactions)
    setTransactions(result.transactions)
  })
  if (!result) {
    return <div>No data available. Please finalize transactions first.</div>;
  }

  return (
    <div>
      <h2>Transaction Results</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.from} pays {transaction.amount} to {transaction.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
