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
  let topicsPro = TopicModel
    .find({hot:false})
    .sort({_id:-1})
    .exec();

  let hotTopicPro = TopicModel
    .find({hot:false})
    .sort({_id:-1})
    .limit(1)
    .exec();

  Promise
    .all([topicsPro,hotTopicPro])
    .then(function ([topics,hotTopic]) {
      res.render('front-hot-topic',{
        title:'热门话题',
        topics:topics,
        hotTopic:hotTopic[0]
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