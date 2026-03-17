import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import { Admin } from '../../models/admin.model.js';

export const isAdminAuthenticated = async (req, res, next) => {
    try{
        const token=req.cookies.adminToken
        if(!token){
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const admin=await Admin.findById(decoded.adminId).select("-password")
        if(!admin){
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.admin=admin
        next()
        
    }catch(error){
        console.log(error)
        res.status(401).json({ message: "invalid token" })
    }
}


