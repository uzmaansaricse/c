import express from "express";
import { checkUserType, sendOtp, verifyOtp, socialLogin, testEmailConfig, verifyToken, checkAdminAccess } from "../controllers/authController.js";

const router = express.Router();

router.post("/check-user-type", checkUserType);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/social-login", socialLogin);
router.post("/verify-token", verifyToken);
router.post("/check-admin-access", checkAdminAccess);
router.get("/test-email-config", testEmailConfig);

export default router; 