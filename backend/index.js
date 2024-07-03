import express from 'express'
import mongoose from 'mongoose';
import { User } from './models/user.js';
import AppError from './utils/AppError.js';
import cors from 'cors'
import catchAsync from './utils/catchAsync.js';
mongoose.connect('mongodb://127.0.0.1:27017/split-easy');


const app=express();
app.use(cors())
app.use(express.json());

app.post('/api/sign-in',(async (req,res)=>{
    console.log(req.body)
    res.status(200).send(req.body);
}))

app.listen(8080,()=>{
    console.log("Listening on port 777/")
})

app.use((err,req,res,next)=>{
    console.log(err.stack)
    const {message="Something went wrong",status=500} = err;
    res.status(status).send(message);
})