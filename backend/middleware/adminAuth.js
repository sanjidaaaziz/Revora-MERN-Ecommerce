import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check admin role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: Not an admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
