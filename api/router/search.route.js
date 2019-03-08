const controller = require('../controller/search.controller.js');


module.exports = (app) => {

    // Search movies
    app.get('/api/search/movie', controller.searchMovie);

    // Search serials
    app.get('/api/search/serial', controller.searchSerial);

};