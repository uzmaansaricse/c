import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("Connecting to MongoDB...");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test")
  .then(async () => {
    console.log("Connected to MongoDB");
    
    try {
      // Get the collection
      const db = mongoose.connection.db;
      const collection = db.collection('userlogins');
      
      console.log("Checking existing indexes...");
      
      // List all indexes
      const indexes = await collection.indexes();
      console.log("Current indexes:", indexes);
      
      // Check if there's a unique index on mobile field
      const mobileIndex = indexes.find(index => 
        index.key && index.key.mobile === 1 && index.unique === true
      );
      
      if (mobileIndex) {
        console.log("Found unique index on mobile field, dropping it...");
        await collection.dropIndex('mobile_1');
        console.log("✅ Unique index on mobile field dropped successfully");
      } else {
        console.log("No unique index found on mobile field");
      }
      
      // Check if there's a unique index on email field
      const emailIndex = indexes.find(index => 
        index.key && index.key.email === 1 && index.unique === true
      );
      
      if (emailIndex) {
        console.log("Found unique index on email field, dropping it...");
        await collection.dropIndex('email_1');
        console.log("✅ Unique index on email field dropped successfully");
      } else {
        console.log("No unique index found on email field");
      }
      
      console.log("✅ Database index fix completed");
      
    } catch (error) {
      console.error("Error fixing database indexes:", error);
    } finally {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
