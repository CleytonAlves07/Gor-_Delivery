const { Router } = require('express');
const controllerOrders = require('../controllers/controllerOrders');

const routerProducts = Router();

routerProducts.post('/customer/orders', controllerOrders.orderCreate);
routerProducts.get('/customer/orders', controllerOrders.getAllOrders);
routerProducts.get('/customer/orders/:id', controllerOrders.getOrderById);

module.exports = routerProducts;