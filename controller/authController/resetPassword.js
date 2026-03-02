import bcrypt from 'bcrypt';
import { User } from "../../model/user.model.js";

export const ResetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP was verified first
    if (!user.otpVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update and clear all reset fields
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    user.otpVerified = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};