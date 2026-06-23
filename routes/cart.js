const express = require("express");
const { getCartDetails, updateProductToCart } = require("../controller/cartController");
const validateRoutes = require("../middleware/validateRoutes");
const router = express.Router();
router.use(validateRoutes);

router.route("/details").get(getCartDetails);
router.route("/item").post(updateProductToCart);

module.exports = router;