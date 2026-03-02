import jwt from "jsonwebtoken";
import { User } from "../../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.pickToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};