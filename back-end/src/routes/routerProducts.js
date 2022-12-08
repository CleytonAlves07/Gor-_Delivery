const { Router } = require('express');
const controllerProducts = require('../controllers/controllerProducts');
// const { authLogin } = require('../middleware/authLogin');

const routerProducts = Router();

routerProducts.get('/products', controllerProducts.getAllProducts);
routerProducts.get('/customer/products', controllerProducts.getAllProducts);
routerProducts.get('/customer/orders/:id');

module.exports = routerProducts;