const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

// POST
const createCart = asyncHandler(async (req, res, next) => {
  const { id, is_admin } = req.body;

  if (!id || !is_admin) {
    res.status(401);
    throw new Error("Bad request");
  }

  try {
    const cart = await Cart.create({
      id,
      is_admin,
      user_id: req?.user?.id,
    });
    res.status(201).json({
      status: 201,
      data: cart,
      message: "cart created successfully",
    });
  } catch (err) {
    res.status(400);
    next(err);
    throw new Error("Bad request");
  }
});

//GET
const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json({
      status: 200,
      data: cart,
      message: "fetched all cart data successfully",
    });
  } catch (err) {
    res.status(404);
    throw new Error("Cart not found");
  }
});

//GET
const getCartDetails = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req?.user?.id });
    res.status(200).json({
      status: 200,
      data: cart,
      message: "fetched cart details successfully",
    });
  } catch (err) {
    res.status(404);
    throw new Error("Cart not found");
  }
});

module.exports = { createCart, getCart, getCartDetails };
