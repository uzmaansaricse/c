
import nodemailer from "nodemailer";
import { Order } from "../models/Order Model.js";

// Get all orders with delivery details for admin panel
export const getAllOrdersWithDeliveryDetails = async (req, res) => {
  try {
    const { searchByName, searchByEmail, searchByMobile } = req.query;
    let filter = {};

    // Build filter based on search parameters
    if (searchByName || searchByEmail || searchByMobile) {
      filter.$or = [];
      
      if (searchByName) {
        filter.$or.push({
          "deliveryDetails.fullName": { $regex: searchByName, $options: "i" }
        });
      }
      
      if (searchByEmail) {
        filter.$or.push({
          "deliveryDetails.email": { $regex: searchByEmail, $options: "i" }
        });
      }
      
      if (searchByMobile) {
        filter.$or.push({
          "deliveryDetails.mobile": { $regex: searchByMobile, $options: "i" }
        });
      }
    }

    // Find orders with delivery details
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .select("deliveryDetails status createdAt totalPrice books pendingSince")
      .populate({
        path: "books.bookId",
        select: "title"
      });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// New function to send order confirmation email
export const sendOrderConfirmationEmail = async (email, fullName, order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build items table rows HTML
    const itemsRows = order.books.map(book => `
      <tr>
        <td>${book.title}</td>
        <td style="text-align:center;">${book.quantity}</td>
        <td style="text-align:right;">₹${book.price * book.quantity}</td>
      </tr>
    `).join("");

    // Calculate shipping charges (assuming 0 if not present)
    const shippingCharges = order.shippingCharges || 0;

    // Calculate total price
    const totalPrice = order.totalPrice + shippingCharges;

    const mailOptions = {
      from: `Aravali Publication <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmed! Your Aravali Publication order confirmation`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
          <h2>Confirmed! Your Aravali Publication order confirmation</h2>
          <p>Hello <b>${fullName}</b>,</p>
          <p>Thank you for shopping on <a href="https://aravalipublication.com" target="_blank">Aravali Publication</a>. We feel happy to provide you with the latest and newest edition of our books.</p>
          <h3>ORDER #${order._id}</h3>
          <p>Once your order has been dispatched, you will receive a tracking ID.</p>
          <p>And here's summary of your purchase!</p>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 8px;">Items</th>
                <th style="border: 1px solid #000; padding: 8px; text-align:center;">Qty</th>
                <th style="border: 1px solid #000; padding: 8px; text-align:right;">Net Price (after discount)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">Shipping Charges</td>
                <td style="border: 1px solid #000; padding: 8px; text-align:center;">0</td>
                <td style="border: 1px solid #000; padding: 8px; text-align:right;">₹${shippingCharges}</td>
              </tr>
              <tr>
                <td colspan="2" style="border: 1px solid #000; padding: 8px; font-weight: bold;">Total</td>
                <td style="border: 1px solid #000; padding: 8px; text-align:right; font-weight: bold;">₹${totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <h3>Shipping Info</h3>
          <p>
            ${order.deliveryDetails.fullName}<br/>
            ${order.deliveryDetails.address || ''}, ${order.deliveryDetails.city || ''} - ${order.deliveryDetails.pincode || ''}<br/>
            ${order.deliveryDetails.mobile || ''}
          </p>
          <p>We'll get in touch the moment we send out your package.</p>
          <p>Regards,<br/>Aravali Publication</p>
          <p><a href="https://aravalipublication.com" target="_blank">Visit Our Site</a></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw error;
  }
};
