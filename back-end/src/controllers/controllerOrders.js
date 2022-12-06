const serviceOrders = require('../services/serviceOrders');

const getOrderById = async (request, response) => {
  try {
    const { id } = request.params;
    const order = await serviceOrders.getOrderById(id);
    return response.status(200).json(order);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const getAllOrders = async (_request, response) => {
  try {
    const orders = await serviceOrders.getAllOrders();
    return response.status(200).json(orders);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const orderCreate = async (request, response) => {
  try {
      const { userId, 
        sellerId, 
        totalPrice, 
        deliveryAddress, 
        deliveryNumber, 
        saleDate, 
        status } = request.body;
      const orderCreateController = await serviceOrders.orderCreate({ 
        userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
      return response.status(201).json(orderCreateController);
  } catch (error) {
      return response.status(400).json({ message: error.message });
  }
};

module.exports = { getOrderById, getAllOrders, orderCreate };