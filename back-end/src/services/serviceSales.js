const { Sale, User } = require('../database/models');

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);
  return sale;
};

const getSaleBySeller = async (id) => {
  const sale = await Sale
  .findOne({ where: { id }, include: { model: User, as: 'seller_id', attributes: ['name'] } });
  return sale;
};

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

const getAllSalesByUserId = async (userId) => {
  const salesByUserId = await Sale.findAll({
    where: { userId },
  });

  return salesByUserId;
};

const getAllSalesBySellerId = async (sellerId) => {
  const salesBySellerId = await Sale.findAll({
    where: { sellerId },
  });

  return salesBySellerId;
};

const saleCreate = async ({ 
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) => {
  const createSales = await Sale.create({ 
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
  return createSales;
};

const updateSaleToPreparing = async (id, status) => {
  if (await status === 'Pendente') {
    await Sale.update({ status: 'Preparando' }, { where: { id } });
  }
  if (await status === 'Preparando') {
    await Sale.update({ status: 'Em Trânsito' }, { where: { id } });
  }
  if (await status === 'Em Trânsito') {
    await Sale.update({ status: 'Pendente' }, { where: { id } });
  }
};

const verifySaleStatus = async (id) => {
  const status = await Sale.findOne({ where: { id } });
  return status.dataValues.status;
};

module.exports = { 
  getAllSales, 
  getSaleById, 
  saleCreate, 
  getSaleBySeller, 
  getAllSalesByUserId, 
  getAllSalesBySellerId,
  updateSaleToPreparing,
  verifySaleStatus,
  // updateSaleToDelivering,
};