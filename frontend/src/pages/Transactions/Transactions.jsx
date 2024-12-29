import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadState } from "../../store/sessionMethods";
import { addTransaction, removeTransaction } from "../../store/sliceMethods";

const Transactions = () => {
  const [payerName, setPayerName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [names, setNames] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (person) => {
    setSelectedPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const toggleTransactionSelection = (index) => {
    setSelectedTransactions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const removeSelectedTransactions = () => {
    const remainingTransactions = transactions.filter(
      (transaction, index) => !selectedTransactions.includes(index)
    );

    // Dispatch action to remove transactions
    selectedTransactions.forEach((index) =>
      dispatch(removeTransaction({ ind: index }))
    );

    setTransactions(remainingTransactions);
    setSelectedTransactions([]);
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/protect",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("You are authorized");
        } else {
          console.log("Not Authorized");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Some Error", err);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const users = loadState("users", []);
    console.log(users);
    setNames(users ? users : []);
  }, []);

  useEffect(() => {
    const temp = loadState("transactions", []);
    console.log("Loaded Transactions:", temp);
    setTransactions(temp);
  }, []);

  const handleSubmit = () => {
    if (payerName && amount && selectedPeople.length) {
      if (!names.includes(payerName)) {
        alert("Payer name does not match any names in the list.");
        return;
      }

      const totalPeople = selectedPeople.length;
      const perPersonAmount = (amount / totalPeople).toFixed(2);

      const validTransactions = selectedPeople
        .filter((person) => person !== payerName)
        .map((person) => ({
          payer: payerName,
          payee: person,
          amount: perPersonAmount,
        }));

      if (validTransactions.length === 0) {
        alert("No valid transactions to record.");
        return;
      }

      dispatch(addTransaction({ data: [...transactions, validTransactions] }));
      setTransactions((prev) => [...prev, ...validTransactions]);
      alert(
        `Transaction recorded!\nPayer: ${payerName}\nAmount: ${amount}\nPaid for: ${selectedPeople.join(
          ", "
        )}`
      );

      setPayerName("");
      setAmount("");
      setSelectedPeople([]);
    } else {
      alert("Please fill all fields and select at least one person.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Name of payer"
          value={payerName}
          onChange={(e) => setPayerName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount paid"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <h3>Select people the amount is paid for:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {names != null &&
            names.map((name, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPeople.includes(name)}
                    onChange={() => handleCheckboxChange(name)}
                  />
                  {name}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <button onClick={handleSubmit} style={{ width: "fit-content" }}>
        Submit Transaction
      </button>

      <div>
        <h3>Transactions:</h3>
        {transactions.length > 0 ? (
          <>
            <ul>
              {transactions
                .flat()
                .filter(
                  (transaction) =>
                    transaction && transaction.payer && transaction.payee
                )
                .map((transaction, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(index)}
                        onChange={() => toggleTransactionSelection(index)}
                      />
                      {transaction.payer} paid {transaction.amount} for{" "}
                      {transaction.payee}
                    </label>
                  </li>
                ))}
            </ul>
            {selectedTransactions.length > 0 && (
              <button onClick={removeSelectedTransactions}>
                Remove Selected Transactions
              </button>
            )}
          </>
        ) : (
          <p>No transactions recorded.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
