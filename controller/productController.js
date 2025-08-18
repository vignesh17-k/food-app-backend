const mock_data = require("../data/products");
// const { v4: uuidv4 } = require("uuid");

// GET
const getProducts = (req, res) => {
  const updatedProducts = mock_data.products_data?.map((product) => ({
    ...product,
    // id: uuidv4(),
  }));

  res.status(200).json({
    status: 200,
    data: updatedProducts,
    message: "successfully fetched",
  });
};

const getPopularRails = (req, res) => {
  const updated_popular_rails = mock_data.popular_rails.map((id) => {
    const product = mock_data.products_data.find(
      (product) => product?.id === id
    );
    return product;
  });

  res.status(200).json({
    status: 200,
    data: updated_popular_rails,
    message: "successfully fetched popular rails",
  });
};

const getMenuRails = (req, res) => {
  const updated_menu_rails = mock_data.menu_data?.map((menu_item) => {
    const updated_list = menu_item?.list?.map((id) => {
      const product = mock_data.products_data.find(
        (product) => product?.id === id
      );
      return product;
    });
    return {
      ...menu_item,
      list: updated_list,
    };
  });

  res.status(200).json({
    status: 200,
    data: updated_menu_rails,
    message: "successfully fetched menu rails",
  });
};

// GET
const getProductCategories = (req, res) => {
  res.status(200).json({
    status: 200,
    data: mock_data.categories,
    message: "successfully fetched categories",
  });
};

// GET
const getProductDetails = (req, res) => {
  res.status(200).json({
    status: 200,
    message: `successfully fetched detail ${req?.params?.id}`,
  });
};

module.exports = {
  getProducts,
  getProductDetails,
  getProductCategories,
  getPopularRails,
  getMenuRails,
};
