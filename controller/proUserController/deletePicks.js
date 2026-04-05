import { Pick } from "../../models/picks.model.js";

export const deletePick=async(req,res)=>{
    try{
        const {id}=req.params;
        const pick=await Pick.findById(id);
        if(!pick){
            return res.status(404).json({success:false,message:"Pick not found"});
        }
        await Pick.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Pick deleted successfully"});
    }catch(error){
        res.status(500).json({success:false,message:"Server error",error:error.message});
    }
}