const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const getCartDetails = asyncHandler(async (req, res) => {
  try {
    const cart_details_data = await Cart.findOne({ user_id: req?.user?.id });

    if (!cart_details_data) {
      const new_cart = await Cart.create({
        user_id: req?.user?.id,
        products: [],
      });
      return res.status(200).json({
        status: 200,
        data: new_cart,
        message: "Cart created successfully",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: cart_details_data,
        message: "fetched cart details successfully",
      });
    }
  } catch (err) {
    res.status(404);
    next(err);
    throw new Error("Cart not found");
  }
});

const updateProductToCart = asyncHandler(async (req, res) => {
  try {
    const cart_details_data = await Cart.findOne({ user_id: req?.user?.id });

    res.status(200).json({
      status: 200,
      message: "cart details updated successfully",
    });
  } catch (err) {
    res.status(404);
    next(err);
    throw new Error("Cart not found");
  }
});

module.exports = { getCartDetails, updateProductToCart };
