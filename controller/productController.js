const mock_data = require("../data/products");
// const { v4: uuidv4 } = require("uuid");

// Parses "25-30 mins" → 30 (upper bound in minutes)
const parseDeliveryTimeMax = (deliveryTime) => {
  if (!deliveryTime) return null;
  const match = deliveryTime.match(/(\d+)/g);
  if (!match) return null;
  return Math.max(...match.map(Number));
};

// POST /products — body: { search, filters }
const getProducts = (req, res) => {
  const { search, filters = {} } = req.body;
  const {
    minPrice,
    maxPrice,
    rating,
    maxDeliveryTime,
    maxDistance,
    tags,
  } = filters;

  const searchTerm = search?.trim().toLowerCase() || null;

  const parsedTags = tags
    ? (Array.isArray(tags) ? tags : tags.split(",")).map((t) =>
        String(t).trim().toLowerCase()
      )
    : null;

  const filtered = mock_data.products_data?.filter((product) => {
    if (searchTerm) {
      const nameMatch = product.name?.toLowerCase().includes(searchTerm);
      const descMatch = product.description?.toLowerCase().includes(searchTerm);
      const tagMatch = product.tags?.some((t) =>
        t.toLowerCase().includes(searchTerm)
      );
      if (!nameMatch && !descMatch && !tagMatch) return false;
    }

    if (minPrice !== undefined && product.price < parseFloat(minPrice))
      return false;
    if (maxPrice !== undefined && product.price > parseFloat(maxPrice))
      return false;

    if (rating !== undefined) {
      const selectedRating = parseFloat(rating);
      const productRating = product.rating ?? 0;
      if (
        productRating < selectedRating ||
        productRating >= selectedRating + 1
      )
        return false;
    }

    if (maxDeliveryTime !== undefined && product.deliveryTime) {
      const upperMins = parseDeliveryTimeMax(product.deliveryTime);
      if (upperMins !== null && upperMins > parseFloat(maxDeliveryTime))
        return false;
    }

    if (maxDistance !== undefined && product.deliveryDistance !== undefined) {
      if (product.deliveryDistance > parseFloat(maxDistance)) return false;
    }

    if (parsedTags && product.tags) {
      const productTags = product.tags.map((t) => t.toLowerCase());
      const hasAllTags = parsedTags.every((t) => productTags.includes(t));
      if (!hasAllTags) return false;
    }

    return true;
  });

  res.status(200).json({
    status: 200,
    data: filtered,
    message: "successfully fetched",
    total: filtered.length,
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


//GET 

const getProductsByCategory = (req, res)=>{
  const category_id = req?.params?.id;
  const products = mock_data?.products_data?.filter((product) => product?.categories?.includes(category_id));
  res.status(200).json({
    status: 200,
    data: products,
    message: "successfully fetched categories",
  });

};

// GET
const getProductDetails = (req, res) => {
  const product = mock_data.product_details.find(
    (product) => product?.id === req?.params?.id
  );

  res.status(200).json({
    status: 200,
    data: product,
    message: `successfully fetched detail ${req?.params?.id}`,
  });
};

module.exports = {
  getProducts,
  getProductDetails,
  getProductCategories,
  getPopularRails,
  getMenuRails,
  getProductsByCategory,
};
