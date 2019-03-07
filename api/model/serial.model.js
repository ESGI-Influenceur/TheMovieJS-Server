const mongoose = require('mongoose');

const SerialSchema = mongoose.Schema({
    id: Number,
    name: String,
    original_name: String,
    first_air_date: String,
    origin_country: String,
    original_language: String,
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    overview: String,
    poster_path: String,
    backdrop_path: String,
    vote_average: Number

});

SerialSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    return obj;
};



module.exports = mongoose.model('Serial', SerialSchema);