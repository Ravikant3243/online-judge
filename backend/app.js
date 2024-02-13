import express  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import User from "./model/User.js";
import bcrypt from "bcryptjs"
import userRouter from "./routes/user-routes.js";
dotenv.config();
const app=express();
const port =process.env.PORT;
app.use(express.json());
 app.use("/user",userRouter);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
         console.log("database connected");
         app.listen(port,()=>{
           console.log("app is running on ", port);
         })
})
.catch((error)=>{
   console.log("error occurred :" ,error.message);
})



