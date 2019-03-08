const controller = require('../controller/rating.controller.js');

const authJwt = require('../validator/verifyJwtToken');

module.exports = (app) => {

    // Retrieve all Ratings
    app.get('/api/ratings', controller.findAll);

    app.post('/api/ratings/movie/:movieId',[authJwt.verifyToken], controller.rateMovie);

    app.post('/api/ratings/serial/:serialId',[authJwt.verifyToken], controller.rateSerial);
};