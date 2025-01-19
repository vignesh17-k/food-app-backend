const express = require("express");
const {
  createCart,
  getCart,
  getCartDetails,
} = require("../controller/cartController");
const validateRoutes = require("../middleware/validateRoutes");
const router = express.Router();
router.use(validateRoutes)
router.route("/create").post(createCart);
router.route("/all_cart").get(getCart);
router.route("/details").get(getCartDetails);

module.exports = router;

