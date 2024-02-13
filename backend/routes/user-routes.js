import express from "express"
import { userSign, userlogin } from "../controllers/user-controller.js";
const userRouter=express.Router();

userRouter.post("/sign",userSign)
userRouter.post("/login",userlogin)
export default userRouter;



