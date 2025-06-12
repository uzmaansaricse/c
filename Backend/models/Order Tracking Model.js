import mongoose from "mongoose";

const orderTrackingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  status: { type: String, default: "Pending" },
  statusHistory: [
    {
      status: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const OrderTracking = mongoose.model("OrderTracking", orderTrackingSchema);
export {OrderTracking}