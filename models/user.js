var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;