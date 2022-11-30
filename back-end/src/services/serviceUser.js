const { User } = require("../database/models")
const md5 = require('md5')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256'
};

const userLogin = async(email) => {
    const userInfo = await User.findOne({ 
        where: { email }, 
        attributes: {
            exclude: ['password']
        }
    })
    
    return userInfo
}


const generateToken = async ({ email, password }) => {
    const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' })
    const payload = { email, password }
    const jwToken = jwt.sign(payload, secret, jwtConfig);

    return jwToken;
}

const jwTokenVerify = (token) => {
    const jwtDecoded = jwt.verify(token, pass);
    return jwtDecoded
}

module.exports = {
    userLogin,
    generateToken,
    jwTokenVerify,
}