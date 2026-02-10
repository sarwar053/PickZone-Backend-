import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  EmailVarificationToken: {
    type: String,
  },
  EmailverificationTokenExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



export const User = mongoose.model("User", userSchema);