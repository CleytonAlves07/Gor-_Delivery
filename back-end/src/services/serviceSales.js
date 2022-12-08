const { Sale } = require('../database/models');


const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);
  return sale;
};

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

module.exports = { getAllSales, getSaleById, saleCreate };