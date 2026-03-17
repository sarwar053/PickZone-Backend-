
import { Pick } from "../../models/picks.model.js";
export const getPicks=async(req,res)=>{
    try{
        const userId=req.user._id;
        const picks=await Pick.find({userId:userId}).sort({createdAt:-1});

        if(!picks || picks.length===0){
            return res.status(404).json({message:"No picks found"});
        }

        
        res.status(200).json({message:"Picks fetched successfully",picks:picks});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",error:err});
    }
}