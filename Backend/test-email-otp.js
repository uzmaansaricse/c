import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

const BASE_URL = "http://localhost:9000/api/auth";

// Test email addresses
const testEmails = [
  "test1@gmail.com",
  "user@yahoo.com", 
  "demo@hotmail.com",
  "random@outlook.com"
];

async function testEmailOTP(email) {
  try {
    console.log(`\n🧪 Testing OTP for: ${email}`);
    
    // Step 1: Send OTP
    console.log("📤 Sending OTP...");
    const sendResponse = await axios.post(`${BASE_URL}/send-otp`, {
      identifier: email
    });
    
    console.log("✅ Send OTP Response:", sendResponse.data);
    
    // Step 2: Wait a moment for email to be sent
    console.log("⏳ Waiting for email to be sent...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Note: In a real test, you would check the email and get the OTP
    // For this demo, we'll just show that the send was successful
    console.log(`✅ OTP sent successfully to ${email}`);
    
  } catch (error) {
    console.error(`❌ Error testing ${email}:`, error.response?.data || error.message);
  }
}

async function runTests() {
  console.log("🚀 Starting Email OTP Tests...");
  console.log("=" .repeat(50));
  
  for (const email of testEmails) {
    await testEmailOTP(email);
  }
  
  console.log("\n" + "=" .repeat(50));
  console.log("✅ All tests completed!");
  console.log("\n📝 Note: Check your server logs to see if emails were sent successfully");
  console.log("📧 In production, users would receive OTP emails at these addresses");
}

// Run the tests
runTests().catch(console.error);
