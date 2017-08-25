const TopicModel =require('../models/topic.js');
const CommentModel =require('../models/comment.js');

exports.topicNew = function(req,res){
  res.render('topic-new',{
    title:'新的热门话题'
  })
};


exports.topicProfile = function(req,res){
  let topic_id = req.params._id;
  CommentModel
    .find({topic:topic_id})
    .populate('topic','title')
    .exec()
    .then(function(comments){
      res.render('comment-list',{
        title:'评论列表',
        comments
      })
    })
    .catch(function(err){
      next(err)
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

exports.delete = function(req,res,next){
  let _id = req.params._id;
  TopicModel
    .deleteOne({_id:_id})
    .then(function(data){
      res.json({
        state:'success',
        data
      })
    })
    .catch(function(err){
      next(err)
    })
};