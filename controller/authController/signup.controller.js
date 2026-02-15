import dotenv from "dotenv";
dotenv.config();
import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const SignupUser=async (req,res)=>{
  try{
    const {name,email,password,confromPassword}=req.body;
    if(!name || !email || !password|| !confromPassword){
      return res.status(400).json({message:"All fields are required"});
    }
    const userExists=await User.findOne({$or:[{name},{email}]});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    if(password!==confromPassword){
      return res.status(400).json({message:"Passwords do not match"});
    }
    if(password.length<8){
      return res.status(400).json({message:"Password must be at least 8 characters long"});
    }

  const EmailVarificationToken=crypto.randomBytes(32).toString("hex");
 const EmailverificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
      name,
      email,
      password:hashedPassword,
      EmailVarificationToken,
      EmailverificationTokenExpiry

    })

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${EmailVarificationToken}`;

   const emailResponse=  await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, // e.g., "onboarding@resend.dev"
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #4CAF50; 
                color: white !important; 
                text-decoration: none; 
                border-radius: 5px; 
                margin: 20px 0; 
              }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to Our App!</h1>
              <p>Hi ${name},</p>
              <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
              <p>This verification link will expire in 24 hours.</p>
              <div class="footer">
                <p>If you didn't create an account, please ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    
    console.log("Resend response:", emailResponse);

    res.status(201).json({message:"User created successfully",user});

  }catch(err){
        res.status(500).json({message:"Internal server error",error:err});
  }
}