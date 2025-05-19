

import jwt from 'jsonwebtoken';

// authMiddleware to check JWT token and user authentication
const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  // If there's no token, respond with an error
  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied." });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify with your JWT secret key
    req.user = decoded; // Save user info in request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid." });
  }
};

export { authMiddleware };


