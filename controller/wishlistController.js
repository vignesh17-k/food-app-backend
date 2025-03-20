const getWishlistData = (req, res) => {
  return res.status(200).json({
    status: 200,
    data: [],
    message: "successfully fetched wishlist data",
  });
};

const addProductToWishlist = (req, res) => {
  return res.status(200).json({
    status: 200,
    data: [],
    message: "successfully fetched wishlist data",
  });
};

module.exports = { getWishlistData, addProductToWishlist };
