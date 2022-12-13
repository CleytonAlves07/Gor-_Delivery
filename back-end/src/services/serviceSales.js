const { Sale, User } = require('../database/models');

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);
  return sale;
};

const getSaleBySeller = async (id) => {
  const sale = await Sale
  .findOne({ where: { id }, include: { model: User, as: 'seller_id', attributes: ['name'] } });
  return sale;
}

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

const saleCreate = async ({ 
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) => {
  const createSales = await Sale.create({ 
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
  return createSales;
};

module.exports = { getAllSales, getSaleById, saleCreate, getSaleBySeller };
