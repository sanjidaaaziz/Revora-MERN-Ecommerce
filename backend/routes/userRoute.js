import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getDashboardSummary,
} from "../controllers/userController.js";

const userRouter = express.Router();

// --------------------------
// Authentication routes
// --------------------------
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/admin/summary", adminAuth, getDashboardSummary);

// --------------------------
// Profile routes (authenticated)
// --------------------------

// GET user profile
userRouter.get("/profile", authUser, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update profile (name/email)
userRouter.put("/profile", authUser, async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const user = await userModel
      .findByIdAndUpdate(req.user.id, { name, email, contact }, { new: true })
      .select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update password
userRouter.put("/password", authUser, async (req, res) => {
  try {
    const { current, newPassword } = req.body;
    const user = await userModel.findById(req.user.id);

    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all users (Admin only)
userRouter.get("/all", authUser, async (req, res) => {
  try {
    // Optional: Check if user is admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    const users = await userModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a user (Admin only)
userRouter.delete("/:id", authUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Block And Unblock User (Admin only)
userRouter.put("/block/:id", authUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.isBlocked = !user.isBlocked; // toggle
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default userRouter;
