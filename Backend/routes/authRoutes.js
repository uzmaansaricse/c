import express from "express";
import { checkUserType, sendOtp, verifyOtp, socialLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/check-user-type", checkUserType);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/social-login", socialLogin);

export default router; 