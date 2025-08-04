

import jwt from 'jsonwebtoken';
import { UserLogin } from "../models/User Model & OTP Model.js";

// authMiddleware to check JWT token and user authentication
const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  // If there's no token, respond with an error
  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied." });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify with your JWT secret key
    req.user = decoded; // Save user info in request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid." });
  }
};

export { authMiddleware };

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { identifier } = req.body; // phone or email
  if (!identifier) return res.status(400).json({ message: "Phone or email required" });

  const user = await UserLogin.findOne({
    $or: [{ mobile: identifier }, { email: identifier }]
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
  await user.save();

  // TODO: Send OTP via SMS or Email here

  return res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body;
  if (!identifier || !otp) return res.status(400).json({ message: "All fields required" });

  const user = await UserLogin.findOne({
    $or: [{ mobile: identifier }, { email: identifier }]
  });

  if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  const payload = { userId: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return res.json({ token, role: user.role });
};

export const socialLogin = async (req, res) => {
  const { provider, socialToken } = req.body;
  // TODO: Verify socialToken with provider (Google/Apple)
  // Get user info from provider

  // Example: let email = ...; // from provider
  // let name = ...;

  // Find or create user
  let user = await UserLogin.findOne({ email });
  if (!user) {
    user = new UserLogin({ name, email, role: "user" });
    await user.save();
  }

  const payload = { userId: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return res.json({ token, role: user.role });
};


