const mongoose = require('mongoose');
 
const CommentSchema = mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

CommentSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj;
};
 
module.exports = mongoose.model('Role', RoleSchema);