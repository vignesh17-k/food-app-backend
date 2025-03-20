const express = require("express");
const { getWishlistData, addProductToWishlist } = require("../controller/wishlistController");
const validateRoutes = require("../middleware/validateRoutes");

const router  = express.Router();


router.use(validateRoutes)
router.route('/').get(getWishlistData)
router.route('/').post(addProductToWishlist)

module.exports = router;