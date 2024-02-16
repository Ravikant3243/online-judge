import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 import cookieParser from "cookie-parser";
export const userSign = async (req, res, next) => {
  const { userId, firstname, lastname, email, password } = req.body;
  if (!userId || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "fill all the required fields" });
  }
  const hashedpassword = bcrypt.hashSync(password);

  const user = await User.create({
    userId,
    firstname,
    lastname,
    email,
    password: hashedpassword,
  });

  if (!user) {
    return res.status(400).json({ message: "registered succesfully" });
  }
  console.log("signed up succesfully");
  const token = jwt.sign({ userId, id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return res.status(200).json({ token, message: "registered succesfully" });
};

export const userLogin = async (req, res, next) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "fill all the required fields" });
  }
  const existingUser = await User.findOne({ userId });
  if (!existingUser) {
    return res.status(500).json({ message: "use does not exists" });
  }
  const iscorrect=bcrypt.compareSync(password,existingUser.password);
   if(!iscorrect){
     return res.status(500).json({message:"incorrect password"});
   }

  const token = jwt.sign({ userId, id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
   const options={
     expires:new Date(Date.now() + 1*24*60*60*1000
     ),
     httpOnly:true
   }

  return res.status(200).cookie('token',token,options).json({ message: "logged in successfully", token });
};
