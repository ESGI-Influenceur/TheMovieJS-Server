const Movie = require('../model/movie.model.js');
const Serial = require('../model/serial.model.js');

// Search movie
exports.searchMovie = (req, res) => {
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

// Search serial
exports.searchSerial = (req, res) => {
    Serial.find({ $text: { $search: req.query.query } })
        .limit(10)
        .populate('genre',{_id : 0,__v:0})
        .then(serials => {
            res.send(serials);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving serials."
        });
    });
};