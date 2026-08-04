const express = require("express");
const {
  getCartDetails,
  updateProductToCart,
  initializeCart,
} = require("../controller/cartController");
const validateRoutes = require("../middleware/validateRoutes");
const router = express.Router();
router.use(validateRoutes);

router.route("/initialize").post(initializeCart);
router.route("/details").get(getCartDetails);
router.route("/item").post(updateProductToCart);

module.exports = router;
