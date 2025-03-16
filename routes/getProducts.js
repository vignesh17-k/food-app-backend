const express = require("express");
const router = express.Router();
const {
    getProducts, 
    getProductDetails,
    getProductCategories,
    getPopularRails,
    getMenuRails
} = require('../controller/productController')

router.route("/").get(getProducts);
router.route("/popular").get(getPopularRails);
router.route("/menu_item").get(getMenuRails);
router.route("/categories").get(getProductCategories);
router.route("/detail/:id").get(getProductDetails)

module.exports = router;
