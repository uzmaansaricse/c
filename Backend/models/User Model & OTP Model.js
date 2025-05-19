import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],  // User ya Admin ka role define karega
    default: "user"
  },
  otp: { type: String }, // OTP store hoga
  otpExpiresAt: { type: Date } // OTP expiry time
}, { timestamps: true });

const UserLogin = mongoose.model("UserLogin", userSchema);
export { UserLogin };
