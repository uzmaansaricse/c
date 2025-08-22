import express from "express";
import { checkUserType, sendOtp, verifyOtp, socialLogin, testEmailConfig, getSocialLoginConfig } from "../controllers/authController.js";

const router = express.Router();

router.post("/check-user-type", checkUserType);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/social-login", socialLogin);
router.get("/test-email-config", testEmailConfig);
router.get("/social-login-config", getSocialLoginConfig);

export default router; 