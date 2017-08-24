const TopicModel =require('../models/topic.js');

exports.detail = function(req,res,next){
  let _id=req.params._id;
  TopicModel
    .findById(_id)
    .exec()
    .then((topic)=>{
      topic.views++;
      return topic.save();
    })
    .then((topic)=>{
      res.render('front-detail-page',{
        title:'文章详情',
        topic,
        hotComments:[1,2,3],
        allComments:[1,2,3]
      })
    })
    .catch(function (err) {
      next(err)
    });
};

exports.hot = function(req,res,next){
  TopicModel
    .find({})
    .sort({_id:-1})
    .exec()
    .then(function (topics) {
      res.render('front-hot-topic',{
        title:'热门话题',
        hotTopics:topics
      })
    })
    .catch(function (err) {
      next(err)
    });
};

exports.edit = function(req,res){
  res.render('ueditor',{
    title:'编辑话题',
    hotTopics:[1,2,3]
  })
};