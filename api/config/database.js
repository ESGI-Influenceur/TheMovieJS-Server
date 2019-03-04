const mongoose = require('mongoose');
const env = require('./env.js');
const Role = require('../model/role.model');
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

function initial(){


    Role.countDocuments( (err, count) => {
        if(!err && count === 0) {
            console.log("Init role index.");
            // USER Role ->
            new Role({
                name: 'USER'
            }).save()
                .then(() => {
                    console.log("USER_ROLE is added");
                })
                .catch(err => {
                    console.error(err.stack);
                });

            // ADMIN Role ->
            new Role({
                name: 'ADMIN'
            }).save()
                .then(() => {
                    console.log("ADMIN_ROLE is added");
                })
                .catch(err => {
                    console.error(err.stack);
                });
        }
    });



    User.countDocuments( (err, count) => {
        if(!err && count === 0){

            console.log("Init user index.");

            new User({
                username:   'admin',
                name:       'nadjim',
                email:      'c.nadjim@gmail.com',
                password:   bcrypt.hashSync("admin", 8)
            }).save()
                .then(() => {
                    console.log("ADMIN is added");
                })
                .catch(err => {
                    return console.error(err.stack);
                })
        }

    });
}

function populateFromMovieDb() {
    
}

const database = () => {

    console.log("MongoDB url : %s",env.database);
    mongoose.Promise = global.Promise;

    mongoose.connect(env.database,{ useNewUrlParser: true })
        .then(() => {
            console.log("Successfully connected to MongoDB.");
            initial();
        })
        .catch(() => {
            console.log('Could not connect to MongoDB.');
            process.exit();
        });
};


module.exports = database;