import { Pick } from "../../models/picks.model.js";

export const getStatus=async (req ,res)=>{
    try{
        const userId=req.user._id;
        const picks=await Pick.find({userId:userId})

        const totalPicks=picks.length;
        const wins=picks.filter(pick=>pick.result==="win").length;
        const losses=picks.filter(pick=>pick.result==="loss").length;
        const pending=picks.filter(pick=>pick.result==="pending").length

        const winRate=wins+losses>0?((wins/(wins+losses))*100).toFixed(1):0;

        res.status(200).json({
            success:true,
            stats:{
                totalPicks,
                wins,
                losses,
                pending,
                winRate:`${winRate}%`
            }
        })
    }catch(error){
        res.stats(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}