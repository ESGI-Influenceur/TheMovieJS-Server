const Comment = require('../model/comment.model');
const User = require('../model/user.model');
const Movie = require('../model/movie.model');
const Serial = require('../model/serial.model');


exports.findAll = (req, res) => {
    Comment.find()
        .populate('user',{_id : 0,__v:0})
        .then(comments => {
            res.send(comments);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

exports.commentMovie = (req, response) => {
  console.log(req.body);
  User.findById(req.userId)
    .then( () =>  {

      new Comment({
        content: req.body.content,
        user: req.userId
      }).save((err,comment) => {

        Movie.findOne({id: req.params.movieId})
          .then(res => {
            res.comments.push(comment._id);
            res.save((err,movie) => {
              response.status(201).send(comment);
            });
          })
          .catch(error => {
            response.status(500).send({
            message: error.message
          });
        })

      })
    }).catch(error => {
    response.status(500).send({
        message: error.message
      });
  });
};

exports.commentSerial = (req, response) => {
  console.log(req.body);
  User.findById(req.userId)
    .then( () =>  {

      new Comment({
        content: req.body.content,
        user: req.userId
      }).save((err,comment) => {

        Serial.findOne({id: req.params.serialId})
          .then(res => {
            res.comments.push(comment._id);
            res.save((err,serial) => {
              response.status(201).send(comment);
            });
          })
          .catch(error => {
            response.status(500).send({
              message: error.message
            });
          })

      })
    }).catch(error => {
    response.status(500).send({
      message: error.message
    });
  });
};

