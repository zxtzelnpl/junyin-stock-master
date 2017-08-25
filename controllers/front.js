const TopicModel =require('../models/topic.js');
const CommentModel =require('../models/comment.js');

exports.detail = function(req,res,next){
  let _id=req.params._id;
  let topicPromise=TopicModel
    .findById(_id)
    .exec()
    .then((topic)=>{
      topic.views++;
      return topic.save();
    });

  let hotCommentPromise = CommentModel
    .find({
      topic:_id,
      'sub.1': {$exists: true}
    })
    .sort({'sub["length"]':1})
    .limit(3)
    .exec();

  let commentPromise=CommentModel
    .find({topic:_id})
    .exec();

  Promise
    .all([topicPromise,hotCommentPromise,commentPromise])
    .then(([topic,hot_comments,comments])=>{
      res.render('front-detail-page',{
        title:'文章详情',
        topic,
        comments,
        hot_comments
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