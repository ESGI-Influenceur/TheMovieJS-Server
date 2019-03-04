const env = require('../config/env.js');

const Role = require('../model/role.model.js');
const User = require('../model/user.model.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signin = (req, res) => {
    console.log("Sign-In");

    User.findOne({ username: req.body.username })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with username " + req.body.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with username " + req.body.username
            });
        });
    /*
    .exec((err, user) => {

        console.log("error : "+err);
        console.log("user : "+user);
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with Username = " + req.body.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with Username = " + req.body.username
            });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
        }

        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, accessToken: token });
    });*/
};

exports.signup = (req, res) => {

	// Save User to Database
	console.log("Processing func -> SignUp");

	let user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

    // Save a User to the MongoDB
    user.save()
        .then(res => {

        })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        });

};

exports.userContent = (req, res) => {
	User.findOne({ _id: req.userId })
	.select('-_id -__v -password')
	.populate('roles', '-_id -__v')
	.exec((err, user) => {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with _id = " + req.userId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving User with _id = " + req.userId	
			});
		}
					
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	});
};
