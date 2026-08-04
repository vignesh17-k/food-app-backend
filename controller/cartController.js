const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const initializeCart = asyncHandler(async (req, res, next) => {
  try {
    const new_cart_data = await Cart.create({
      user_id: req?.body?.id,
      products: [],
    });
    return res.status(200).json({
      status: 200,
      data: new_cart_data,
      message: "Cart initialized successfully",
    });
  } catch (err) {
    res.status(404);
    next(err);
    throw new Error("Cart not found");
  }
});

const getCartDetails = asyncHandler(async (req, res, next) => {
  try {
    const cart_details_data = await Cart.findOne({ user_id: req?.user?.id });

    if (!cart_details_data) {
      initializeCart(req, res, next);
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

const updateProductToCart = asyncHandler(async (req, res, next) => {
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

module.exports = { getCartDetails, updateProductToCart, initializeCart };
