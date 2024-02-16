import express from "express"
import { userLogin, userSign} from "../controllers/user-controller.js";
const userRouter=express.Router();

userRouter.post("/register",userSign)
userRouter.post("/login",userLogin);

export default userRouter;



