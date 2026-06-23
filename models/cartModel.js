const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    products: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: [{ type: Number, required: true }],
        price: { type: Number, required: true },
        calories: { type: Number, required: true },
        isFavorite: { type: Boolean, default: false },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1, required: true },
        added_at: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
