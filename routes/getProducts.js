const express = require("express");
const router = express.Router();
const {
    getProducts, 
    getProductDetails,
    getProductCategories
} = require('../controller/productController')

router.route("/").get(getProducts);
router.route("/categories").get(getProductCategories);
router.route("/detail/:id").get(getProductDetails)

module.exports = router;
