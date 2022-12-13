const { Router } = require('express');
const controllerSalesProduct = require('../controllers/controllerSalesProduct');

const routerSalesProduct = Router();

routerSalesProduct.post('/sales_product', controllerSalesProduct.salesCreate);
routerSalesProduct.get('/sales_product', controllerSalesProduct.getAllSaleProduct);

module.exports = routerSalesProduct;