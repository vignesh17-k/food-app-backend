const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    id: { type: String, required: [true, "id is required"] },
    is_admin: { type: Boolean, required: [true, "is_admin is required"] },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
