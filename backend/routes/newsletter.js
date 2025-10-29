// server/routes/newsletter.js
import express from "express";
import Newsletter from "../models/Newsletter.js"; // MongoDB model

const router = express.Router();

// POST /api/newsletter
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Optional: prevent duplicate emails
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
