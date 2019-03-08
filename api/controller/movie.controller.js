const Movie = require('../model/movie.model.js');


// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
      .populate({ path: 'comments', model: 'Comment', select :'-__v',
        populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}})
      .populate({ path: 'votes', model: 'Rating',select :'-__v',
        populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}},)
      .populate('genre',{_id : 0,__v:0})
      .lean()
        .then(movies => {
            res.send(movies);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {

    Movie.findOne({id:req.params.moviesId})
        .populate({ path: 'comments', model: 'Comment', select :'-__v',
          populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}})
        .populate({ path: 'votes', model: 'Rating',select :'-__v',
          populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}},)
        .populate('genre',{_id : 0,__v:0})
        .lean()
        .then(movie => {
            if(!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.movieId
                });
            }
            res.send(movie);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

// Search movie
exports.search = (req, res) => {
    Movie.find({ $text: { $search: req.query.query } })
        .limit(10)
        .populate('genre',{_id : 0,__v:0})
        .then(movies => {
            res.send(movies);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};