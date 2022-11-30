const { Router } = require('express');
const controllerUser = require('../controllers/controllerUser')

const routerLogin = Router();

routerLogin.post('/login', controllerUser.userLogin);

module.exports = routerLogin;