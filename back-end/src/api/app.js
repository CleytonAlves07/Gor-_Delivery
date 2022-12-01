const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middleware/errorMiddleware');
const routerLogin = require('../routes/routerLogin');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routerLogin);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorMiddleware);

module.exports = app;
