import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export const SignupUser=async (req,res)=>{
  try{
    const {name,email,password,confromPassword}=req.body;
    if(!name || !email || !password|| !confromPassword){
      return res.status(400).json({message:"All fields are required"});
    }
    const userExists=await User.findOne({$or:[{name},{email}]});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    if(password!==confromPassword){
      return res.status(400).json({message:"Passwords do not match"});
    }
    if(password.length<8){
      return res.status(400).json({message:"Password must be at least 8 characters long"});
    }

    const EmailVarificationToken=crypto.randomBytes(32).toString("hex");
 const EmailverificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
      name,
      email,
      password:hashedPassword,
      EmailVarificationToken,
      EmailverificationTokenExpiry

    })

    

    res.status(201).json({message:"User created successfully",user});

  }catch{
        res.status(500).json({message:"Internal server error"});
  }
}