import { User } from "../../models/user.model.js";
import { Pick } from "../../models/picks.model.js";


export const getAllUserPicks=async(req,res)=>{
        try{
            const prouser=await User.find({userType:"proUser"}).select("name email")

            // fetch all picks for each pro user in parallel
            const userWithPciks=await Promise.all(
                prouser.map(async(user)=>{
                    const picks=await Pick.find({userId:user._id}).sort({createdAt:-1})
                    return {
                        user:{_id:user._id,name:user.name,email:user.email},
                        picks
                    }

                }
            )
        )
        res.status(200).json({success:true,message:"All user picks fetched successfully",userWithPciks})
        }catch(err){
            res.status(500).json({message:err.message})
        }
}