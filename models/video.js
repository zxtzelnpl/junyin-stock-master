var mongoose = require('mongoose');
var VideoSchema = require('../schemas/video.js');
var VideoModel=mongoose.model('Video',VideoSchema);

module.exports = VideoModel;