
import pickPriceModel from "../../models/pickPrice.model.js"



const getPicksPrice=async (req,res)=>{
    try{
        let setting=await pickPriceModel.findOne()
        if(!setting){
            setting=await pickPriceModel.create({prices:[]})
        }
        res.status(200).json({success:true,setting})
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
} 

const updatePickPrice=async (req,res)=>{
    try{
        const {prices}=req.body
        if(!Array.isArray(prices)){
            return res.status(400).json({success:false,message:"Price must be an array of numbers"})
        }

        const parsed=prices.map(Number).filter((n)=>!isNaN(n) && n>=0)
        const settings=await pickPriceModel.findOne()
        if(!settings){
            await pickPriceModel.create({prices:parsed})
        }else{
            settings.prices=parsed
            await settings.save()
        }

        res.status(200).json({success:true,message:"Pick price updated successfully"})
        
    }catch(err){
        
        console.log(err)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
export {getPicksPrice,updatePickPrice}