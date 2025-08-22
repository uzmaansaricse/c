import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

console.log("Testing Email Configuration...");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test transporter
transporter.verify(function(error, success) {
  if (error) {
    console.error("❌ Email configuration error:", error);
    console.error("Please check your EMAIL_USER and EMAIL_PASS environment variables");
  } else {
    console.log("✅ Email configuration is working!");
    
    // Test sending an email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: "Test Email from Your App",
      text: "This is a test email to verify your email configuration is working.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>Hello,</p>
          <p>This is a test email to verify your email configuration is working correctly.</p>
          <p>If you receive this email, your email OTP functionality should work properly.</p>
          <p>Best regards,<br>Your App Team</p>
        </div>
      `
    };
    
    transporter.sendMail(testEmail, (error, info) => {
      if (error) {
        console.error("❌ Failed to send test email:", error);
      } else {
        console.log("✅ Test email sent successfully!");
        console.log("Message ID:", info.messageId);
      }
      process.exit(0);
    });
  }
});
