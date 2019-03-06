const verifySignUp = require('../validator/verifySignUp');
const authJwt = require('../validator/verifyJwtToken');
const controller = require('../controller/auth.controller.js');

module.exports = (app) => {

    // Create a new user
	app.post('/api/auth/register', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    // Create a authentification token
	app.post('/api/auth/login', controller.signin);

};