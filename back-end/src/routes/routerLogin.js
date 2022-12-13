const { Router } = require('express');
const controllerUser = require('../controllers/controllerUser');
const { authLogin } = require('../middleware/authLogin');

const routerLogin = Router();

routerLogin.post('/login', authLogin, controllerUser.userLogin);
routerLogin.post('/register', controllerUser.userCreate);
routerLogin.get('/sellers', controllerUser.getAllSellers);

module.exports = routerLogin;