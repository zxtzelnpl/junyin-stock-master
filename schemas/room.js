var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name:{
    type:String,
    unique:true
  },
  note:String
});

module.exports = RoomSchema;