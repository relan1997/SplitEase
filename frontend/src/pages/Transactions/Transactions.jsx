import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadState } from "../../store/sessionMethods";
import { addTransaction, removeTransaction } from "../../store/sliceMethods";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Logout from "../../components/Logout";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Serif JP', serif;
  }
`;

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 100vw;
  height: 100vh;
  background-color: #e9efec;
  overflow-x: hidden;
`;

const InputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #c4dad2;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
`;

const TransactionsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #c4dad2;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid #6a9c89;
  border-radius: 5px;
  flex: 1;
  background-color: #e9efec;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #16423c;
  }
    margin-bottom:10px;
`;

const CheckboxList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top:10px;
`;

const CheckboxItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6a9c89;
  border-radius: 20px;
  padding: 5px 10px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &.selected {
    background-color: #16423c;
  }
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change from wrap to column */
  gap: 10px;
  overflow-y: auto;
  height: calc(100vh - 100px);
  margin: 20px 0;
`;

const TransactionColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 5rem;
  gap: 10px;
  cursor: pointer;
`;

const TransactionCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6a9c89; /* Fill color */
  cursor: pointer;
  &:checked {
    background-color: #16423c; /* Checked color */
  }
`;

const scaleUp = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.03);
    }
    100% {
        transform: scale(1);
    }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #16423c;
  color: #e9efec;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Transition for background color and transform */

  &:hover {
    background-color: #6a9c89;
    animation: ${scaleUp} 0.3s ease-in-out; /* Scale animation on hover */
  }

  &:active {
    transform: scale(0.95); /* Slightly shrink on click */
  }
`;

const SubmitButton = styled(StyledButton)`
   margin-right: 10px; /* Add left margin */
`;

const FinalizeButton=styled(StyledButton)`
    margin-bottom:10px;
`;


const FontPreconnect = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&display=swap"
      rel="stylesheet"
    />
  </>
);

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

  const handleFinalizeTransactions = () => {
    axios
      .post(
        "https://splitease-75wc.onrender.com/find_min_transactions",
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

  const handleSelectAllUsers = () => {
    if (selectAll) {
      setSelectedPeople([]); // Deselect all
    } else {
      setSelectedPeople(names); // Select all
    }
    setSelectAll(!selectAll); // Toggle select all state
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
        "https://splitease-75wc.onrender.com/protect",
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setPayerName("");
      setAmount("");
      setSelectedPeople([]);
      setSelectAll(false);
    } else {
      alert("Please fill all fields and select at least one person.");
    }

    const toggleTransactionSelection = (index) => {
      setSelectedTransactions((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    const removeSelectedTransactions = () => {
      const remainingTransactions = transactions.filter(
        (_, index) => !selectedTransactions.includes(index)
      );
      selectedTransactions.forEach((index) =>
        dispatch(removeTransaction({ ind: index }))
      );
      setTransactions(remainingTransactions);
      setSelectedTransactions([]);
    };
  };

  return (
    <>
      <GlobalStyle />
      <FontPreconnect />
      <PageContainer>
        <InputSection>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <StyledInput
                type="text"
                placeholder="Name of payer"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
              />
              <StyledInput
                type="number"
                placeholder="Amount paid"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
            <h3>Select people the amount is paid for:</h3>
            <CheckboxList>
              <StyledButton type="button" onClick={handleSelectAllUsers}>
                {selectAll ? "Deselect All" : "Select All"}
              </StyledButton>
              {names.map((name, index) => (
                <CheckboxItem
                  key={index}
                  className={selectedPeople.includes(name) ? "selected" : ""}
                  onClick={() => handleCheckboxChange(name)}
                >
                  {name}
                </CheckboxItem>
              ))}
            </CheckboxList>
            <SubmitButton type="submit">Submit Transaction</SubmitButton>
            <Logout />
          </form>
        </InputSection>

        <TransactionsSection>
          <h3>Transactions:</h3>
          <StyledButton
            onClick={() =>
              setSelectedTransactions(transactions.map((_, index) => index))
            }
          >
            Select All
          </StyledButton>
          <TransactionsContainer>
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className={
                  selectedTransactions.includes(index) ? "selected" : ""
                }
              >
                <TransactionCheckbox
                  type="checkbox"
                  checked={selectedTransactions.includes(index)}
                  onChange={() => toggleTransactionSelection(index)}
                />
                {`${transaction.payer} paid ${transaction.payee} ₹${transaction.amount}`}
              </div>
            ))}
          </TransactionsContainer>
          <FinalizeButton onClick={handleFinalizeTransactions}>
            Finalize Transactions
          </FinalizeButton>
          <StyledButton onClick={removeSelectedTransactions}>
            Remove Selected Transactions
          </StyledButton>
        </TransactionsSection>
      </PageContainer>
    </>
  );
};

export default Transactions;
