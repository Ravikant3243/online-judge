import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const userSign = async (req, res, next) => {
  const { userId, firstname, lastname, email, password } = req.body;
  if (!userId || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "give correct user data" });
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
    return res.status(400).json({ message: "some error occurred" });
  }
  console.log("user signed in");
  return res.status(200).json(user);
};
export const userlogin = async (req, res, next) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "user does not exist" });
  }
  const existingUser = await User.findOne({ userId });
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "user does not exist sign in first" });
  }
  const iscorrect=bcrypt.compareSync(password,existingUser.password);
   if(!iscorrect){
     return res.status(500).json({message:"incorrect password"});
   }
    const token=jwt.sign({userId,id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'7d'});
    console.log(token);
     return res.status(200).json({message:"user logged in",token});
};
