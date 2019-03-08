const env = require('../config/env.js');

const Role = require('../model/role.model.js');
const User = require('../model/user.model.js');
const config = require('../config/env');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signin = (req, res) => {

    if(!req.body.username || !req.body.password){
        return res.status(500).send({
            message: "JSON Error"
        });
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            if(user){

                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if (!passwordIsValid) {
                    return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
                }

                let token = jwt.sign({ id: user._id, username : user.username, email : user.email, roles : user.roles }, config.secret, {
                   expiresIn: 86400 // expires in 24 hours
                    //expiresIn: 120
                });

                return res.status(200).send({ token: token });

            }else {
                return res.status(404).send({
                    message: "User not found with username " + req.body.username
                });
            }
        });



};

exports.signup = async (req, res) => {
    let userRole = null;
    await Role.findOne({name:'USER'})
        .then(res => {
            if(res){
                userRole = res;
            }else {
                return res.status(500).send({ reason: "User role missing" });
            }
        });

	// Save User to Database
	console.log("Processing func -> SignUp");

	let user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
        roles : [userRole._id]
	}).save((err,userSaved) => {
      if(userSaved){
        return res.status(201).send({ success: userSaved.username+" created" });
      }else{

        return res.status(500).send({ reason: err.message });
      }
    });




};


