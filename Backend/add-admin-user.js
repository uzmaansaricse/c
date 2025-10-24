import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserLogin } from "./models/User Model & OTP Model.js";

dotenv.config();

const addAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminMobile = process.env.ADMIN_MOBILE;

    // Check if admin user already exists
    const existingAdmin = await UserLogin.findOne({
      $or: [
        { email: adminEmail },
        { mobile: adminMobile }
      ]
    });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email || existingAdmin.mobile);
      
      // Update role to admin if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log("Updated existing user role to admin");
      }
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      const adminUser = new UserLogin({
        name: "Admin User",
        email: adminEmail,
        mobile: adminMobile,
        password: hashedPassword,
        role: "admin",
        loginMethod: "email"
      });

      await adminUser.save();
      console.log("Admin user created successfully:", adminEmail);
    }

    // List all users
    const allUsers = await UserLogin.find({});
    console.log("\nAll users in database:");
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email || user.mobile}) - Role: ${user.role}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

addAdminUser();
