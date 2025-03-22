const express = require("express");
const { getWishlistData, addProductToWishlist, removeProductFromWishlist } = require("../controller/wishlistController");
const validateRoutes = require("../middleware/validateRoutes");

const router  = express.Router();


router.use(validateRoutes)
router.route('/').get(getWishlistData)
router.route('/add').post(addProductToWishlist)
router.route('/remove/:product_id').delete(removeProductFromWishlist)

module.exports = router;