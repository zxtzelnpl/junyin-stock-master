const QuestionModel = require('../models/question');
const moment = require('moment');

exports.new = function (req, res) {
  let callback = req.query.callback;
  let questionObj = {
    teacher:req.query.teacher,
    ask:req.query.ask,
    phone:req.query.phone
  };
  let question = new QuestionModel(questionObj);
  let data = {};
  let str;
  question
    .save()
    .then(()=>{
      data.state = 'success';
      str = callback + '(' + JSON.stringify(data) + ')';
      res.send(str);
    })
    .catch(()=>{
      data.state = 'fail';
      str = callback + '(' + JSON.stringify(data) + ')';
      res.send(str);
    });
};

exports.jsonpList = function(req,res){
  let callback = req.query.callback;
  let data={};
  let str;
  QuestionModel
    .find({
      answer:{$exists:true}
    })
    .exec()
    .then((questions)=>{
      data.state='success';
      data.questions = questions;
      str=callback+'('+JSON.stringify(data)+')';
      res.send(str)
    })
    .catch((err)=>{
      data.state='fail';
      data.err = err;
      str=callback+'('+JSON.stringify(data)+')';
      res.send(str)
    })
};

exports.questionList = function(req,res,next){
  QuestionModel
    .find({})
    .exec()
    .then((questions)=>{
      res.render('question-list',{
        title:'老师问答',
        questions
      })
    })
    .catch((err)=>{
      next(err)
    })
};

exports.questionProfile = function(req,res,next){
  let _id=req.params._id;
  QuestionModel
    .findById(_id)
    .exec()
    .then(function(question){
      res.render('question-profile',{
        title:'问题详情',
        question
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.answer = function(req,res,next){
  let _id=req.params._id;
  QuestionModel
    .findById(_id)
    .exec()
    .then(function(question){
      let questionObj = req.body;
      questionObj.answerAt = moment(new Date()).format('YYYY-MM-DD HH:mm');
      Object.assign(question,questionObj);
      return question.save()
    })
    .then(function(question){
      res.json({
        state:'success',
        question
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.delete = function(req,res,next){
  let _id = req.params._id;
  QuestionModel
    .deleteOne({_id:_id})
    .then(function(results){
      res.json({
        state:'success',
        results
      })
    })
    .catch(function(err){
      next(err)
    })
};