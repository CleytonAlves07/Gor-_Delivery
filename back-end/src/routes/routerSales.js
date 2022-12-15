const { Router } = require('express');
const controllerSales = require('../controllers/controllerSales');
const authenticationMiddleware = require('../middleware/token');

const routerSales = Router();
const updateStatusRoute = '/sales/:id';

routerSales.post('/sales', controllerSales.salesCreate);
routerSales.get('/sales/customer', authenticationMiddleware, controllerSales.getAllSalesByUserId);
routerSales.get('/sales/seller', authenticationMiddleware, controllerSales.getAllSalesBySellerId);
routerSales.put(updateStatusRoute, authenticationMiddleware, controllerSales.updtSale); 
routerSales.get('/sales', controllerSales.getAllSales);
routerSales.get('/sales/:id', controllerSales.getSaleById);
routerSales.patch(updateStatusRoute, controllerSales.updateSaleToPreparing);

module.exports = routerSales;