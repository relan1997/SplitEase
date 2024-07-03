import express from 'express'
import mongoose from 'mongoose';
import { User } from './models/user.js';
import AppError from './utils/AppError.js';
mongoose.connect('mongodb://127.0.0.1:27017/split-easy');

const app=express();

app.listen(8080,()=>{
    console.log("Listening on port 777")
})

app.use((err,req,res,next)=>{
    console.log(err.stack)
    const {message="Something went wrong",status=500} = err;
    res.status(status).send(message);
})