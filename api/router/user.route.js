const controller = require('../controller/user.controller.js');

module.exports = (app) => {

    // Create a new User
    app.post('/api/users', controller.create);

    // Retrieve all Notes
    app.get('/api/users', controller.findAll);

    // Retrieve a single User with userId
    app.get('/api/users/:userId', controller.findOne);

    // Update a User with userId
    app.put('/api/users/:userId', controller.update);

    // Delete a User with userId
    app.delete('/api/users/:userId', controller.delete);
};