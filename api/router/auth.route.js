const verifySignUp = require('../validator/verifySignUp');
const authJwt = require('../validator/verifyJwtToken');
const controller = require('../controller/auth.controller.js');

module.exports = (app) => {

    // Create a authentification token
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    // Create a new user
	app.post('/api/auth/signin', controller.signin);

	// Get current user info
	app.get('/api/auth/me', [authJwt.verifyToken], controller.userContent);

};