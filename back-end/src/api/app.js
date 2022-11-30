const express = require('express');
const routerLogin = require('../routes/routerLogin')

const app = express();
app.use(express.json());

app.use(routerLogin);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
