const mongoose = require('mongoose');
const TopicSchema = require('../schemas/topic.js');
const TopicModel=mongoose.model('Topic',TopicSchema);

module.exports = TopicModel;