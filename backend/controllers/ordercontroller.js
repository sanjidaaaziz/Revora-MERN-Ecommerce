import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; // ✅ use jsonwebtoken for verification

const currency = "inr";
const deliveryCharge = 10;

// Placing order using COD method
const placeOrder = async (req, res) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Please login to place an order" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const userId = decoded.id;

    // 3️⃣ Get order details
    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // 4️⃣ Save order
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // 5️⃣ Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // 6️⃣ Respond
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Features
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Orders
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // get from token decoded by auth middleware
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Update Payment Status (Admin Only)
const updatePaymentStatus = async (req, res) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // 4️⃣ Get orderId & paymentStatus
    const { orderId, paymentStatus } = req.body;

    if (!["Pending", "Paid"].includes(paymentStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment status" });
    }

    // 5️⃣ Update order
    await orderModel.findByIdAndUpdate(orderId, { paymentStatus });
    res.json({ success: true, message: "Payment status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus, updatePaymentStatus };
