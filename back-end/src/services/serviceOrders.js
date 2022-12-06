const { Sale } = require('../database/models');
// const httpException = require('../middleware/httpException');

const getOrderById = async (id) => {
  const order = await Sale.findByPk(id);
  return order;
};

const getAllOrders = async () => {
  const orders = await Sale.findAll();
  return orders;
};

const orderCreate = async ({ 
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) => {
  const createOrder = await Sale.create({ 
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
  return createOrder;
};

module.exports = { getAllOrders, getOrderById, orderCreate };