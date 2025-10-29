import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// INFO: Function to create token
const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// INFO: Route for user login (works for both user & admin)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user or admin by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Check if user is blocked
    if (user.isBlocked) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Your account is blocked. Contact admin.",
        });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create JWT token
    const token = createToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error while logging in user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for user registration (only for normal users)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Validate contact as phone number
    if (!validator.isMobilePhone(contact, "any")) {
      // 'any' allows any locale
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role = 'user'
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      contact,
      role: "user",
    });

    // Save user
    const user = await newUser.save();

    // Create token
    const token = createToken(user);

    // Send response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error while registering user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email and role
    const admin = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create token
    const token = createToken(admin);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log("Error while logging in admin: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Admin Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalProducts = await productModel.countDocuments();

    res.json({ success: true, totalUsers, totalOrders, totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, loginAdmin, getDashboardSummary };
