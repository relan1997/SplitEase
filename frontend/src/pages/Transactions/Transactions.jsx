import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadState } from "../../store/sessionMethods";
import { addTransaction, removeTransaction } from "../../store/sliceMethods";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckboxList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 400px;
`;

const CheckboxItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const TransactionColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Transactions = () => {
  const [payerName, setPayerName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [names, setNames] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = (person) => {
    setSelectedPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const toggleTransactionSelection = (index) => {
    setSelectedTransactions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeSelectedTransactions = () => {
    const remainingTransactions = transactions.filter(
      (transaction, index) => !selectedTransactions.includes(index)
    );

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
    setNames(users ? users : []);
  }, []);

  useEffect(() => {
    const temp = loadState("transactions", []);
    setTransactions(temp);
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedPeople(selectAll ? [] : [...names]);
  };

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

  const handleFinalizeTransactions = () => {
    axios
      .post(
        "http://localhost:8080/find_min_transactions",
        {
          names,
          transactions,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          navigate("/result", { state: { result: res.data } });
        }
      })
      .catch((err) => {
        console.error("Error finalizing transactions", err);
      });
  };

  return (
    <PageContainer>
      <InputGroup>
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
      </InputGroup>

      <div>
        <h3>Select people the amount is paid for:</h3>
        <button onClick={handleSelectAll}>{
          selectAll ? "Deselect All" : "Select All"
        }</button>
        <CheckboxList>
          {names != null &&
            names.map((name, index) => (
              <CheckboxItem key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPeople.includes(name)}
                    onChange={() => handleCheckboxChange(name)}
                  />
                  {name}
                </label>
              </CheckboxItem>
            ))}
        </CheckboxList>
      </div>

      <Button onClick={handleSubmit}>Submit Transaction</Button>
      <Button onClick={handleFinalizeTransactions}>Finalize Transactions</Button>

      <div>
        <h3>Transactions:</h3>
        <TransactionsContainer>
          {transactions.length > 0 ? (
            <>
              {[...Array(Math.ceil(transactions.length / 10)).keys()].map(
                (colIndex) => (
                  <TransactionColumn key={colIndex}>
                    {transactions
                      .slice(colIndex * 10, (colIndex + 1) * 10)
                      .map((transaction, index) => (
                        <label key={index}>
                          <input
                            type="checkbox"
                            checked={selectedTransactions.includes(index)}
                            onChange={() => toggleTransactionSelection(index)}
                          />
                          {transaction.payer} paid {transaction.amount} for {" "}
                          {transaction.payee}
                        </label>
                      ))}
                  </TransactionColumn>
                )
              )}
            </>
          ) : (
            <p>No transactions recorded.</p>
          )}
        </TransactionsContainer>

        {selectedTransactions.length > 0 && (
          <Button onClick={removeSelectedTransactions}>
            Remove Selected Transactions
          </Button>
        )}
      </div>
    </PageContainer>
  );
};

export default Transactions;
