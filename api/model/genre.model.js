const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    id: Number,
    name: String
});

GenreSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    return obj;
};

module.exports = mongoose.model('Genre', GenreSchema);