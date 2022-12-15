const { Product } = require('../database/models');
// const httpException = require('../middleware/httpException');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  getAllProducts,
};