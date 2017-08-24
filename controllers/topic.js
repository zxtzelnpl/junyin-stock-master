const TopicModel =require('../models/topic.js');

exports.topicNew = function(req,res){
  res.render('topic-new',{
    title:'新的热门话题'
  })
};

exports.new = function(req,res,next){
  let topic = new TopicModel(req.body);
  topic
    .save()
    .then(()=>{
      res.json({
        state:'success'
      })
    })
    .catch((err)=>{
      next(err)
    })
};

exports.topicList = function (req, res, next) {
  TopicModel
    .find({})
    .sort({_id:-1})
    .exec()
    .then(function (topics) {
      res.render('topic-list', {
        title: '话题列表',
        topics: topics
      })
    })
    .catch(function (err) {
      next(err)
    })
};

exports.topicUpdate = function(req,res,next){
  let _id=req.params._id;
  TopicModel
    .findOne({_id})
    .exec()
    .then(function(topic){
      res.render('topic-update',{
        title:'新的热门话题',
        topic
      })
    })
    .catch((err)=>{
      next(err)
    })
};

exports.update = function(req,res,next){
  let topicObj = req.body;
  TopicModel
    .findById(topicObj._id)
    .exec()
    .then(function(topic){
      Object.assign(topic,topicObj);
      return topic.save()
    })
    .then(function(){
      res.json({
        state:'success'
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.praise = function(req,res,next){
  let _id=req.params._id;
  TopicModel
    .findById(_id)
    .exec()
    .then((topic)=>{
      topic.praise++;
      return topic.save();
    })
    .then(()=>{
      res.json({
        state:'success'
      })
    })
    .catch(function (err) {
      next(err)
    });
};