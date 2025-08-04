import { UserLogin } from "../models/User Model & OTP Model.js";

// Search users by mobile or email query param
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Case-insensitive partial match on mobile or email
    const users = await UserLogin.find({
      $or: [
        { mobile: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).select("name mobile email role");

    res.json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user detail by user ID param
export const getUserDetail = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await UserLogin.findById(userId).select("name mobile email role createdAt updatedAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};
