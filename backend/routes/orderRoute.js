import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  updatePaymentStatus,
} from "../controllers/ordercontroller.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/payment-status", adminAuth, updatePaymentStatus);
//orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

// Verify Payment
//orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
