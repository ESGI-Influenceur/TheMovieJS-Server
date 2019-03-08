const mongoose = require('mongoose');
 
const RatingSchema = mongoose.Schema({
    vote: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

RatingSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj;
};
 
module.exports = mongoose.model('Rating', RatingSchema);