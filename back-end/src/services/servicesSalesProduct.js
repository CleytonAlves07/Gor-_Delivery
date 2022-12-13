const { SaleProduct } = require('../database/models');

const saleCreate = async (body) => {
    const postSaleOrder = await SaleProduct.bulkCreate(body);
    return postSaleOrder;
  };

const getAllSaleProduct = async () => {
    const allSalesProducts = await SaleProduct.findAll();
    return allSalesProducts;
  };

module.exports = {
    saleCreate,
    getAllSaleProduct,
};