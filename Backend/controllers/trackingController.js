import { Order } from "../models/Order Model.js";

export const saveTracking = async (req, res) => {
  const { orderId, trackingId, message } = req.body;

  try {
    const order = await Order.findById(orderId).populate("userId");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.trackingId = trackingId;
    await order.save();

    const email = order.userId.email;
    const name = order.deliveryDetails.fullName;

    // Send email
    const { sendTrackingEmail } = await import("../utils/sendEmail.js");
    await sendTrackingEmail(email, name, trackingId, message);

    res.json({ success: true, message: "Tracking ID saved and email sent." });
  } catch (err) {
    console.error("Tracking Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
