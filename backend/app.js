import express  from "express";

 const app=express();
  app.use("/",(req,res)=>{
     console.log(`app is running`);
    res.status(200).json("running fine");
  })
  app.listen(8080,()=>{
    console.log("server in running on port 8080");
  })