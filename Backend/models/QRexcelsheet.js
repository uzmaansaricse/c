import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ["uploaded", "verified", "scanned"], default: "uploaded" },
  firstScanDate: { type: Date },
  lastScanDate: { type: Date },
  scanCount: { type: Number, default: 0 }
}, { timestamps: true });

const Qurexcel = mongoose.model("Qurexcel", bookSchema);
export { Qurexcel };
