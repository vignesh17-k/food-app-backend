const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    products: [
      {
        product_id: { type: String, required: true },
        added_at: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
