import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "./models/userModel.js";
mongoose
  .connect(
    "mongodb+srv://harshal:LtXwFJc0sH8O96GX@cluster0.u57rmde.mongodb.net/splitEase?retryWrites=true&w=majority&appName=Cluster0"
  )
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
  console.log("Inside middleware",token,blacklist)
  if (!token)
    return res.status(401).json({ message: "Token missing or invalid" });
  if (blacklist.includes(token)) {
    return res.status(403).json({ message: "Token has been invalidated" });
  }
  jwt.verify(token, "1234", (err, user) => {
    if (err) return res.status(403).json({ message: "Token is invalid" });
    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Inside Register", username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, password: hashedPassword });
    console.log(user);
    await user.save();
    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    res.status(500).json({ error: error });
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
      "1234",
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
    console.log(token);
    const decoded = jwt.verify(token, "1234");
    console.log(decoded);
    req.userId = decoded.userId;
    req.username = decoded.username;
    console.log(req.userId, req.username);
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
  console.log("Inside route",token)
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  blacklist.push(token);
  res.status(200).json({ message: "Logout successful" });
});

app.listen(8080, () => {
  console.log("Listening on Port 8080");
});
