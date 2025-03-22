const expressAsyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");

const getWishlistData = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user_id: req?.user?.id });

    res.status(200).json({
      status: 200,
      data: wishlist,
      message: "successfully fetched wishlist data",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const addProductToWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const product_id = req?.body?.product_id;
    const user_id = req?.user?.id;

    //checking for existing wishlist
    let wishlist = await Wishlist.findOne({ user_id: req?.user?.id });
    //checking for product id
    if (!product_id) {
      res.status(404).json({ message: "product id is required", error });
    }

    //create new wishlist if not exist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: user_id,
        products: [],
      });
    }

    wishlist.products.push({ product_id });

    await wishlist.save();

    return res.status(201).json({
      status: 201,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const removeProductFromWishlist = expressAsyncHandler(async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user_id: req?.user?.id });

    wishlist.products = wishlist?.products?.filter(
      (p) => p.product_id !== req?.params?.product_id
    );

    await wishlist.save();

    res.status(200).json({
      status: 200,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = { getWishlistData, addProductToWishlist , removeProductFromWishlist };
