import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout";
import { loadState } from "../../store/sessionMethods";
import { addUser, removeUser } from "../../store/sliceMethods";
import { useDispatch } from "react-redux";
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
        if (res.status == 200) {
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

  const addUsername = (name) => {
    const newName = name.trim();
    if (newName) {
      setNames([...names, newName]); // Update local state
      dispatch(addUser({ data: newName })); // Dispatch a single user to Redux
      setName(""); // Clear the input after adding the name
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

    // Update Redux state and sessionStorage in one operation
    dispatch(removeUser({ data: selectedNames }));

    // Update local state
    setNames(remainingNames);
    setSelectedNames([]);
  };

  return (
    <>
      <h1>Enter the names of all the users involved</h1>
      <input
        type="text"
        name="names"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => addUsername(name)}>Add User</button>

      <h2>Names List</h2>
      <ul>
        {names.map((n, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedNames.includes(n)}
              onChange={() => toggleSelection(n)}
            />
            {n}
          </li>
        ))}
      </ul>

      {selectedNames.length > 0 && (
        <button onClick={removeSelected}>Remove Selected</button>
      )}

      <Logout />
    </>
  );
};

export default Names;
