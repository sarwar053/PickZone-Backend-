import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {Admin} from '../models/admin.model.js'

import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const hashedPassword=await bcrypt.hash("admin256*@258",10)

await Admin.create({
    name:"Admin",
    adminId:"admin5353",
    password:hashedPassword

})
console.log("Admin created successfully")
await mongoose.disconnect();

