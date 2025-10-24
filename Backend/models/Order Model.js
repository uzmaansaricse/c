

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserLogin", required: false },
    orderId: { type: String, unique: true, required: true},
    userEmail: { type: String }, // Added email field
    books: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    deliveryDetails: {
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentId: { type: String, required: false },
    status: { type: String, enum: ["Pending", "Paid", "Failed", "Cancelled", "Incomplete", "Unshipped", "Shipped", "Delivered", "Refunded"], default: "Pending" },
    failureReason: { type: String, default: "" },
    trackingId: { type: String, default: "" },
    statusHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now },
      },
    ],
    pendingSince: { type: Date, default: function () { return this.status === "Pending" ? Date.now() : null; } }
  },
  { timestamps: true }
);

// Add pre-save middleware to populate userEmail
orderSchema.pre('save', async function(next) {
  if (!this.userEmail && this.userId) {
    try {
      const UserLogin = mongoose.model('UserLogin');
      const user = await UserLogin.findById(this.userId);
      if (user) {
        this.userEmail = user.email;
      }
    } catch (error) {
      console.error('Error populating userEmail:', error);
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export { Order };