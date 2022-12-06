const serviceProducts = require('../services/serviceProducts');

const getAllProducts = async (_request, response) => {
  try {
    const products = await serviceProducts.getAllProducts();
    console.log('controller', products);
    return response.status(200).json(products);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

module.exports = { getAllProducts };