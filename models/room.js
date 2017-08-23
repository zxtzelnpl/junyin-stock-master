var mongoose=require('mongoose');
var RoomSchema = require('../schemas/room.js');
var RoomModel=mongoose.model('Room',RoomSchema);

module.exports = RoomModel;
