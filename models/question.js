const mongoose = require('mongoose');
const QuestionSchema = require('../schemas/question.js');
const QuestionModel = mongoose.model('Question',QuestionSchema);

module.exports = QuestionModel;