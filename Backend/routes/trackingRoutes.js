import express from "express";
import { saveTracking } from "../controllers/trackingController.js";

const router = express.Router();

router.post("/save-tracking", saveTracking);

export default router;
