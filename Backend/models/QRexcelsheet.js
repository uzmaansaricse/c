import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true, unique: true },
});

 const Qurexcel = mongoose.model("Qurexcel", bookSchema);
 export {Qurexcel};
