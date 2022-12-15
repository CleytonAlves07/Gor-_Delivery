const { Router } = require('express');
const controllerSales = require('../controllers/controllerSales');
const authenticationMiddleware = require('../middleware/token');

const routerSales = Router();

routerSales.post('/sales', controllerSales.salesCreate);
routerSales.get('/sales/customer', authenticationMiddleware, controllerSales.getAllSalesByUserId);
routerSales.get('/sales', controllerSales.getAllSales);
routerSales.get('/sales/:id', controllerSales.getSaleById);

module.exports = routerSales;