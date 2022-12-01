const { Router } = require('express');
const controllerUser = require('../controllers/controllerUser');
const { authLogin } = require('../middleware/authLogin');

const routerLogin = Router();

routerLogin.post('/login', authLogin, controllerUser.userLogin);

module.exports = routerLogin;