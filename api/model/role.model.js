const mongoose = require('mongoose');
 
const RoleSchema = mongoose.Schema({
    name: String
});

RoleSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj;
};
 
module.exports = mongoose.model('Role', RoleSchema);