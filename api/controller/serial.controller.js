const Serial = require('../model/serial.model');


// Retrieve and return all serials from the database.
exports.findAll = (req, res) => {
    Serial.find()
      .populate({ path: 'comments', model: 'Comment',select :'-__v',
                  populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}},)
      .populate({ path: 'votes', model: 'Rating',select :'-__v',
                 populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}},)
      .populate('genre',{_id : 0,__v:0})
        .then(serials => {
            res.send(serials);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving serials."
        });
    });
};

// Find a single serial with a serialId
exports.findOne = (req, res) => {
    Serial.findOne({id: req.params.serialsId})
        .populate({ path: 'comments', model: 'Comment', select :'-__v',
                    populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}})
        .populate({ path: 'votes', model: 'Rating',select :'-__v',
                    populate: {path: 'user', model: 'User',select:'-password -roles -__v -movies -serials'}},)
        .populate('genre',{_id : 0,__v:0})
        .lean()
        .then(serial => {
            if(!serial) {
                return res.status(404).send({
                    message: "Serial not found with id " + req.params.serialId
                });
            }
            res.send(serial);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.serialsId
            });
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.serialsId
        });
    });
};

// Search serial
/*exports.search = (req, res) => {
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
};*/