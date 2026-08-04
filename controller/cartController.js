const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const initializeCart = asyncHandler(async (req, res) => {
  try {
    const user_id = req?.body?.user_id;
    if (!user_id) {
      return res.status(400).json({
        status: 400,
        message: "user_id is required",
      });
    }

    const existing_cart = await Cart.findOne({ user_id: user_id });
    if (existing_cart) {
      return res.status(200).json({
        status: 200,
        data: existing_cart,
        message: "Cart already exists",
      });
    }

    const new_cart_data = await Cart.create({
      cart_id: uuidv4(),
      user_id: user_id,
      products: [],
    });

    return res.status(200).json({
      status: 200,
      data: new_cart_data,
      message: "Cart initialized successfully",
    });
  } catch (err) {
    res.status(404);
    throw new Error(err.message || "Failed to initialize cart");
  }
});

const getCartDetails = asyncHandler(async (req, res) => {
  try {
    const user_id = req?.body?.user_id;

    return res.status(200).json({
      status: 200,
      data: cart_details_data,
      message: "fetched cart details successfully",
    });
  } catch (err) {
    res.status(404);
    throw new Error(err.message || "Cart not found");
  }
});

const updateProductToCart = asyncHandler(async (req, res) => {
  try {
    const cart_details_data = await Cart.findOne({ user_id: req?.user?.user_id });

    return res.status(200).json({
      status: 200,
      data: cart_details_data,
      message: "cart details updated successfully",
    });
  } catch (err) {
    res.status(404);
    throw new Error(err.message || "Cart not found");
  }
});

module.exports = { getCartDetails, updateProductToCart, initializeCart };
