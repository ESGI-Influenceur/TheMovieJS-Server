const controller = require('../controller/movie.controller.js');

const authJwt = require('../validator/verifyJwtToken');

module.exports = (app) => {
    // Retrieve all Notes
    app.get('/api/movies', controller.findAll);

    // Retrieve a single Note with moviesId
    app.get('/api/movies/:moviesId', controller.findOne);

    // Search movies
    app.get('/api/search', controller.search);

};