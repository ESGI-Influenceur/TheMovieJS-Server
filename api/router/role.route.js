const controller = require('../controller/role.controller.js');

module.exports = (app) => {
    // Create a new Note
    app.post('/api/roles', controller.create);

    // Retrieve all Notes
    app.get('/api/roles', controller.findAll);

    // Retrieve a single Note with roleId
    app.get('/api/roles/:roleId', controller.findOne);

    // Update a Note with roleId
    app.put('/api/roles/:roleId', controller.update);

    // Delete a Note with roleId
    app.delete('/api/roles/:roleId', controller.delete);
};