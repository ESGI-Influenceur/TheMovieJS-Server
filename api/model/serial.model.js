const mongoose = require('mongoose');

const SerialSchema = mongoose.Schema({
    id: Number,
    adult: Boolean,
    backdrop_path: String,
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    original_language: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: Date,
    title: String,
    video: String,
    vote_average: Number,
    vote_count: Number,
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
});

MovieSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    return obj;
};



module.exports = mongoose.model('Movie', MovieSchema);