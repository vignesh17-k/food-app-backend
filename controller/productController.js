const products_data = require("../data/products");
const { v4: uuidv4 } = require('uuid');

// GET
const getProducts = (req, res) => {

  const updatedProducts = products_data?.map(product => ({
    ...product,
    id: uuidv4(),
  }));

  res.status(200).json({
    status: 200,
    data: updatedProducts,
    message: "successfully fetched",
  });
};

// GET
const getProductDetails = (req, res) => {
  res.status(200).json({
    status: 200,
    message: `successfully fetched detail ${req?.params?.id}`,
  });
};

module.exports = { getProducts, getProductDetails };
