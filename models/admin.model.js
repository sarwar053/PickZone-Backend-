import mongoose from "mongoose";

import bcrypt from 'bcryptjs'

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})


export const Admin=mongoose.model("Admin",adminSchema)
