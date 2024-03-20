const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }],
  totalAmount: { type: Number, required: true },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
