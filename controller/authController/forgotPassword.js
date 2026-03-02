import { User } from "../../model/user.model.js";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export  const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6 digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP to user
    user.resetOtp = otp;
    user.resetOtpExpiry = otpExpiry;
    await user.save();

    // Send email via Resend
    await resend.emails.send({
      from: "YourApp <onboarding@resend.dev>", // change to your domain
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
          <h2 style="color: #1e293b;">Password Reset</h2>
          <p style="color: #64748b;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="text-align: center; margin: 32px 0;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #6366f1;">${otp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 13px;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

