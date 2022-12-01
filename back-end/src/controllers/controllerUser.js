const serviceUser = require('../services/serviceUser');

const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body
        const userInfo = await serviceUser.userLogin(email, password);

        if (!userInfo) {
        return response.status(404)
        .json({ message: 'Some required fields are missing' }); 
}
        // token
        const token = await serviceUser.generateToken(request.body);
        return response.status(200).json({ userInfo, token });
    } catch (error) {
        return response.status(404).json({ message: error.message });
    }
};

const userCreate = async (request, response) => {
    try {
        const { email, name, password, role } = request.body;
        const createUserController = await serviceUser.createUser({ email, name, password, role });
        return response.status(201).json(createUserController);
    } catch (error) {
        return response.status(409).json({ message: error.message });
    }
}

module.exports = {
    userLogin,
    userCreate,
};