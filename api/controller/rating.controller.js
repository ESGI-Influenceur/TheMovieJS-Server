const Comment = require('../model/comment.model');
const User = require('../model/user.model');
const Movie = require('../model/movie.model');
const Serial = require('../model/serial.model');
const Rating = require('../model/rating.model');


exports.findAll = (req, res) => {
  Rating.find()
        .populate('user',{_id : 0,__v:0})
        .then(ratings => {
            res.send(ratings);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ratings."
        });
    });
};

exports.rateMovie = (req, response) => {
  User.findById(req.userId)
    .then( () =>  {
      new Rating({
        vote: req.body.vote,
        user: req.userId
      }).save((err,rating) => {
        Movie.findOne({id: req.params.movieId})
          .then(res => {
            res.votes.push(rating._id);
            res.save((err,movie) => {
              response.status(201).send(rating);
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

exports.rateSerial = (req, response) => {
  User.findById(req.userId)
    .then( () =>  {
      new Rating({
        vote: req.body.vote,
        user: req.userId
      }).save((err,rating) => {
        Serial.findOne({id: req.params.serialId})
          .then(res => {
            res.votes.push(rating._id);
            res.save((err,serial) => {
              response.status(201).send(rating);
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