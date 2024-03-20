const express = require("express");
const OrderModel = require("../models/order.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

// Place new order (Protected Route)
router.post("/", auth, async (req, res) => {
  try {
    const { user, books, totalAmount } = req.body;
    const order = new OrderModel({ user, books, totalAmount });
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all orders (Protected Route - Admin Only)
router.get("/", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("user").populate("books");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
