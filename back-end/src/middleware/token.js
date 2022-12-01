const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const error = { status: 401, message: 'Token not found' };
        throw error;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        req.user = payload;

        return next();
    } catch (err) {
        const error = { status: 401, message: 'Expired or invalid token' };
        throw error;
    }
};

module.exports = authenticationMiddleware;