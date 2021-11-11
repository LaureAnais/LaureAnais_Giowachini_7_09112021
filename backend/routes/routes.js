const AuthenticationController = require('../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');


module.exports = (app) => {
    app.post('/signup',
        AuthenticationControllerPolicy.signup,
        AuthenticationController.signup)
}

