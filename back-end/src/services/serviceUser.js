const fs = require('fs');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const userLogin = async (email) => {
    const userInfo = await User.findOne({ 
        where: { email }, 
        attributes: {
            exclude: ['password'],
        },
    });
    
    return userInfo;
};

const generateToken = async ({ email, password }) => {
    const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });
    const payload = { email, password };
    const jwToken = jwt.sign(payload, secret, jwtConfig);

    return jwToken;
};

module.exports = {
    userLogin,
    generateToken,
};