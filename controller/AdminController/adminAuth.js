import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import { Admin } from '../../models/admin.model.js';


export const loginAdmin = async (req, res) => {
    try {
        const { adminId, password } = req.body;
        if (!adminId || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const admin = await Admin.findOne({ adminId })
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "Login successful",
            token,
            adminId: admin._id
        })

    } catch (err) {
            console.log(err)
             res.status(500).json({ message: "Internal server error" })
    }

}

export const logoutAdmin = async (req, res) => {
    try{
        res.clearCookie("adminToken")
        res.status(200).json({ message: "Logout successful" })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({ success: true, admin: req.admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};