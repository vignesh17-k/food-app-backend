const express = require("express");
const router = express.Router();
const {
    getProducts, 
    getProductDetails
} = require('../controller/productController')

router.route("/").get(getProducts);
router.route("/detail/:id").get(getProductDetails)

module.exports = router;
