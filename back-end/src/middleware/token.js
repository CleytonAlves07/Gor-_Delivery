const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

const authenticationMiddleware = (request, _response, next) => {
    const token = request.headers.authorization;
    console.log(token);
    if (!token) {
        const error = { status: 401, message: 'Token not found' };
        throw error;
    }

    try {
        const payload = jwt.verify(token, secret);

        request.user = payload;

        return next();
    } catch (err) {
        const error = { status: 401, message: 'Errado' };
        throw error;
    }
};

module.exports = authenticationMiddleware;