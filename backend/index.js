import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";
import { calculateNetBalances } from "./helper/calculateNetBalances.js";
import { maxFlowAlgo } from "./helper/maxFlowAlgo.js";
import { createFlowGraphMatrix } from "./helper/createFlowGraphMatrix.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(cors());
app.use(express.json());

const blacklist = [];
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Token missing or invalid" });
  if (blacklist.includes(token)) {
    return res.status(403).json({ message: "Token has been invalidated" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is invalid" });
    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = new userModel({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/protect", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.username = decoded.username;
    res.status(200).json({ message: "Valid Token", username: req.username });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  }
});

app.post("/logout", authenticateToken, (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  blacklist.push(token);
  res.status(200).json({ message: "Logout successful" });
});

app.post("/find_min_transactions", authenticateToken, (req, res) => {
  const { names: users, transactions } = req.body;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).send("Invalid users array.");
  }

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).send("Invalid transactions array.");
  }

  const names = [...users];
  names.unshift("source");
  names.push("destination");

  const nameToIndex = new Map();
  names.forEach((name, index) => {
    nameToIndex.set(name, index);
  });

  const { creditors, debtors } = calculateNetBalances(
    names,
    transactions,
    nameToIndex
  );

  const flowGraph = createFlowGraphMatrix(names, creditors, debtors, nameToIndex);

  const paths = [];
  const amtPending = [];

  const maxFlow = maxFlowAlgo(flowGraph, 0, flowGraph.length - 1, paths, amtPending);

  const resultPaths = paths.map((path, index) => ({
    from: names[path[1]],
    to: names[path[2]],
    amount: amtPending[index],
  }));

  res.json({
    maxFlow,
    transactions: resultPaths,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
