
import { User } from "../../model/user.model.js";
import jwt from "jsonwebtoken";


export const VerifyEmail=async(req,res)=>{
  try{
    const {token}=req.query;
    const user=await User.findOne({EmailVarificationToken:token});
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    if(user.EmailverificationTokenExpiry<Date.now()){
      return res.status(400).json({message:"Token expired"});
    }
    user.verified=true;
    user.EmailVarificationToken=undefined;
    user.EmailverificationTokenExpiry=undefined;
    await user.save();

    // JWT token generation
    const jwtToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    // set cookie
    res.cookie('Pick-token',jwtToken,{
      httpOnly:true,
      secure:true,
      maxAge:7*24*60*60*1000,
    })

    res.status(200).json({message:"Email verified successfully",user:user});

  }catch(err){
    console.log(err);
     res.status(500).json({message:"Internal server error",error:err});
  }
}