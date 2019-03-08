const controller = require('../controller/comment.controller.js');

const authJwt = require('../validator/verifyJwtToken');

module.exports = (app) => {
    // Retrieve all Comments
    app.get('/api/comments', controller.findAll);

    app.post('/api/comments/movie/:movieId',[authJwt.verifyToken], controller.commentMovie);

    app.post('/api/comments/serial/:serialId',[authJwt.verifyToken], controller.commentSerial);
};