import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Serif JP', serif;
    background-color: #f4f9f6;
  }
`;

const Container = styled.div`
  background-color: #c4dad2;
  color: #16423c;
  font-family: "Noto Serif JP", serif;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Heading = styled.h2`
  color: #16423c;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
`;

const Message = styled.div`
  color: #6a9c89;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 500px;
  background: #e9efec;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid #6a9c89;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result; // Access the result from state
  const [transactions, setTransactions] = useState([]);

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
    if (result?.transactions) {
      const roundedTransactions = result.transactions.map((transaction) => ({
        ...transaction,
        amount: parseFloat(transaction.amount).toFixed(2),
      }));
      console.log(roundedTransactions);
      setTransactions(roundedTransactions);
    }
  }, [result]);

  if (!result) {
    return (
      <Container>
        <FontPreconnect />
        <Message>
          No data available. Please finalize transactions first.
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <FontPreconnect />
      <GlobalStyle />
      <Heading>Transaction Results</Heading>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <span>{transaction.from}</span>
            <span>pays</span>
            <span>₹{transaction.amount}</span>
            <span>to</span>
            <span>{transaction.to}</span>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Result;
