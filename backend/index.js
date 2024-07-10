import express from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import AppError from "./utils/AppError.js";
import cors from "cors";
import catchAsync from "./utils/catchAsync.js";
import checkUniqueUsername from "./utils/checkUniqueUsername.js";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import { userValidation } from "./utils/userSchema.js";
import { setToken } from "./utils/auth.js";

mongoose.connect("mongodb://127.0.0.1:27017/split-easy");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post(
  "/api/sign-up",
  checkUniqueUsername,
  userValidation,
  async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log(username, password);
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      const token = setToken(user);
      res.cookie("uid", token);
      console.log("Successfully created user");
      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
);

app.post("/api/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) throw new AppError("Incorrect Credentials", 404);
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) throw new AppError("Incorrect credentials", 404);
    const token = setToken(user);
    res.cookie("uid", token);
    console.log("Successfully logged in");
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

app.listen(8080, () => {
  console.log("Listening on port 777/");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});
