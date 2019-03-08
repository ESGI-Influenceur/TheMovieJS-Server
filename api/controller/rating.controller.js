const Comment = require('../model/comment.model');
const User = require('../model/user.model');
const Movie = require('../model/movie.model');
const Serial = require('../model/serial.model');
const Rating = require('../model/rating.model');


exports.findAll = (req, res) => {
  Rating.find()
        .populate({ path: 'user', model: 'User'})
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
            comupteVoteAverage(res,rating)
              .then(() => {
                response.status(201).send(rating);
              })
              .catch(error => {
                response.status(500).send({
                  message: error.message
                });
              })
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
        Serial.findOne({id: req.params.serialId}).populate({ path: 'votes', model: 'Rating'})
          .then(res => {
            comupteVoteAverage(res,rating)
              .then(() => {
                response.status(201).send(rating);
              })
              .catch(error => {
                response.status(500).send({
                  message: error.message
                });
            })
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


async function comupteVoteAverage(show,rating){
  show.vote_average =  ( (show.vote_average * show.votes.length ) + rating.vote) / (show.votes.length + 1);

  return new Promise((resolve,reject) => {
    show.votes.push(rating._id);
    show.save((err,show) => {
      resolve();
    });
  });
}