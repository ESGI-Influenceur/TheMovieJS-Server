const mongoose = require('mongoose');

const SerialSchema = mongoose.Schema({
    id: Number,
    name: String,
    original_name: String,
    first_air_date: String,
    origin_country: String,
    original_language: String,
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    overview: String,
    poster_path: String,
    backdrop_path: String,
    vote_average: Number,
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    votes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }]

});

SerialSchema.index({
    name: 'text'
});

SerialSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    delete obj.votes;
    return obj;
};



module.exports = mongoose.model('Serial', SerialSchema);