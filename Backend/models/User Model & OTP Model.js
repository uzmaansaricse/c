import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required:false,
    unique: false
  },
  email: {      //changes isha
    type: String,
    required: false,
    unique: false
  },
  loginMethod: {
    type: String,
    enum: ['phone', 'email', 'google', 'facebook'],
    required: true,
    default: 'email'
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
