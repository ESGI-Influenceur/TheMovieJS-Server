const Role = require('./role.model.js');
const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({
		name: String,
		username: String,
		email: String,
		password: String,
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

//JsonIgnore some attribut
UserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model('User', UserSchema);