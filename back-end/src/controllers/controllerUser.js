const serviceUser = require('../services/serviceUser');

const userLogin = async (request, response) => {
    try {
        const userInfo = await serviceUser.userLogin(request.body.email);

        if (!userInfo) {
        return response.status(404)
        .json({ message: 'Some required fields are missing' }); 
}

        const token = await serviceUser.generateToken(request.body);
        return response.status(200).json({ userInfo, token });
    } catch (error) {
        return response.status(404).json({ message: error.message });
    }
};

module.exports = {
    userLogin,
};