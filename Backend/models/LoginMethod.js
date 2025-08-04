 import mongoose from "mongoose";

const loginMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserLogin", required: true },
  methodType: { type: String, enum: ["mobile_otp", "email_otp", "google", "facebook"], required: true },
  loginAt: { type: Date, default: Date.now },
  sessionToken: { type: String }, // Optional, if you want to track session tokens
  // You can add more fields like IP address, device info, etc.
});

export const LoginMethod = mongoose.model("LoginMethod", loginMethodSchema);
