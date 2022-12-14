const { SaleProduct, Product, Sale } = require('../database/models');

const saleCreate = async (body) => {
    const postSaleOrder = await SaleProduct.bulkCreate(body);
    return postSaleOrder;
  };

const getAllSaleProduct = async () => {
    const allSalesProducts = await SaleProduct.findAll();
    return allSalesProducts;
};
// Pega todas as informações solicitadas no detalhe de pedidos 
const getSaleProductWithId = async (id) => {
    const saleProduct = await Sale.findAll({
        where: { id },
        include: {
            model: Product,
            as: 'product',
            attributes: ['name', 'price'],
            through: { attributes: ['quantity'] },
        }
    });
    return saleProduct;
};

module.exports = {
    saleCreate,
    getAllSaleProduct,
    getSaleProductWithId,
};