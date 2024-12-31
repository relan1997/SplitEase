import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout";
import { loadState } from "../../store/sessionMethods";
import { addUser, removeUser } from "../../store/sliceMethods";
import { useDispatch } from "react-redux";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Serif JP', serif;
  }
`;

const FontPreconnect = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&display=swap"
      rel="stylesheet"
    />
  </>
);

const Container = styled.div`
  background-color: #e9efec;
  color: #16423c;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  color: #16423c;
  margin-bottom: 20px;
`;

const SubHeader = styled.h2`
  color: #6a9c89;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 12px;
  margin-right: 10px;
  border: 2px solid #c4dad2;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  width: 300px;
  margin-bottom: 20px;

  &:focus {
    border-color: #6a9c89;
  }
`;

const buttonHover = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Button = styled.button`
  background-color: #6a9c89;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16423c;
    animation: ${buttonHover} 0.5s;
  }

  &:disabled {
    background-color: #c4dad2;
    cursor: not-allowed;
  }
`;

const CheckBox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  appearance: none;
  background-color: #c4dad2;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: #6a9c89;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Column = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 24px; /* Increased font size */
  font-weight: bold;
  color: #16423c;
`;

const Names = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const users = loadState("users", []);
    setNames(users);
  }, []);

  useEffect(() => {
    // Authorization check
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
          console.log("Access granted: Authorized user");
        } else {
          console.log("Access denied: Unauthorized user");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("An error occurred", err);
        navigate("/login");
      });
  }, []);

  const addUsername = (name) => {
    const newName = name.trim();
    if (newName) {
      setNames([...names, newName]);
      dispatch(addUser({ data: newName }));
      setName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addUsername(name);
    }
  };

  const toggleSelection = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((n) => n !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const removeSelected = () => {
    const remainingNames = names.filter(
      (name) => !selectedNames.includes(name)
    );

    dispatch(removeUser({ data: selectedNames }));
    setNames(remainingNames);
    setSelectedNames([]);
  };

  const sendNames = () => {
    navigate("/transactions");
  };

  const groupedNames = [];
  for (let i = 0; i < names.length; i += 5) {
    groupedNames.push(names.slice(i, i + 5));
  }

  return (
    <>
      <FontPreconnect />
      <GlobalStyle />
      <Container>
        <Header>Register the Users Involved</Header>
        <Input
          type="text"
          name="names"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a user name and press Enter"
        />
        <Button onClick={() => addUsername(name)}>Add</Button>

        <SubHeader>List of Users</SubHeader>
        <List>
          {groupedNames.map((group, colIndex) => (
            <Column key={colIndex}>
              {group.map((n, index) => (
                <ListItem key={index}>
                  <CheckBox
                    type="checkbox"
                    name="selectedUser"
                    value={n}
                    checked={selectedNames.includes(n)}
                    onChange={() => toggleSelection(n)}
                  />
                  {n}
                </ListItem>
              ))}
            </Column>
          ))}
        </List>

        {selectedNames.length > 0 && (
          <Button onClick={removeSelected}>Delete Selected</Button>
        )}
        <Button onClick={sendNames}>Confirm</Button>
        <Logout />
      </Container>
    </>
  );
};

export default Names;

