// GET
const getProducts = (req, res) => {
  res.status(200).json({
    status: 200,
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
