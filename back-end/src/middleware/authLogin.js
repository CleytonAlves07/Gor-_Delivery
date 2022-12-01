const schemas = require('../schemas/schemaLogin');

const authLogin = async (request, response, next) => {
    const validation = schemas.schemaLogin.validate(request.body);
    if (validation.error) {
        const error = { status: 400, message: 'Some required fields are missing' };
        next(error);
    }
    next();
};

module.exports = {
    authLogin,
};