const controller = require('../controller/serial.controller.js');

const authJwt = require('../validator/verifyJwtToken');

module.exports = (app) => {
    // Retrieve all Notes
    app.get('/api/serials', controller.findAll);

    // Retrieve a single Note with serialsId
    app.get('/api/serials/:serialsId', controller.findOne);

    // Search serials
    //app.get('/api/search', controller.search);

};