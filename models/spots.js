import mongoose from "mongoose";

const spotSchema=new mongoose.Schema(
    {
        sport:{
            type:String,
            required:true,
            unique:true,
            trim:true 
        },
        games:[{type:String,trim:true}],
        teams:[{type:String,trim:true}]
 
    },
    {
        timestamps:true
    }

)

export const Sport=mongoose.model("Spot",spotSchema)