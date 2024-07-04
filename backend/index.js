import express from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import AppError from "./utils/AppError.js";
import cors from "cors";
import catchAsync from "./utils/catchAsync.js";
import checkUniqueUsername from "./utils/checkUniqueUsername.js";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

mongoose.connect("mongodb://127.0.0.1:27017/split-easy");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.post(
  "/api/sign-in",
  checkUniqueUsername,
  async (req, res) => {
    const { username, password } = req.body;
    try{
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password:hashedPassword });
    await user.save();

    return res.status(200).send("User has been saved successfully");
    }catch(err)
    {
      return res.status(400).send({err})
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
