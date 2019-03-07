const env = require('../config/env.js');
const User = require('../model/user.model.js');
const Roles = env.roles;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use

	User.findOne({ username: req.body.username })
	.exec((err, user) => {
		if (err && err.kind !== 'ObjectId'){
			res.status(500).send({
				message: "Error retrieving User with Username = " + req.body.username
			});                
			return;
		}

		if(user){
			res.status(400).send("Fail -> Username is already taken!");
			return;
		}

		User.findOne({ email: req.body.email })
		.exec((err, user) => {
			if (err && err.kind !== 'ObjectId'){
				res.status(500).send({
					message: "Error retrieving User with Email = " + req.body.email
				});                
				return;
			}
	
			if(user){
				res.status(400).send("Fail -> Email is already in use!");
				return;
			}

			next();
		});
	});
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        return res.status(400).send("Fail -> Role cannot be set" + req.body.roles[i]);
    }

	next();
};

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;