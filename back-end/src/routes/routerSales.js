const { Router } = require('express');
const controllerSales = require('../controllers/controllerSales');

const routerSales = Router();

routerSales.post('/sales', controllerSales.salesCreate);
routerSales.get('/sales', controllerSales.getAllSales);
routerSales.get('/sales/:id', controllerSales.getSaleById);

module.exports = routerSales;