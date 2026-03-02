import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginUser=async(req,res)=>{

    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        if(!user.verified){
            return res.status(400).json({message:"Please verify your email"})
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("pickToken",token,{httpOnly:true,maxAge:7*24*60*60*1000,secure:true,sameSite:"none"}).json({message:"Login successful",user:{...user._doc,password:undefined}})
       

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}