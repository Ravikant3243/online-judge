import mongoose from "mongoose";
import { Schema } from "mongoose";
 const userSchema=new Schema({
     userId:{
         type:String,
         required:true,
         minlength:4,
         unique:true
     },
     firstname:{
         type:String,
          required:true
     },lastname:{
        type:String,
        required:true
     },
     email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
         type:String,
         required:true,
         minlength:6
    },
    DOB:{
         type:Date,
         
    }
 });

 const User=mongoose.model("User",userSchema);
 export default User;

