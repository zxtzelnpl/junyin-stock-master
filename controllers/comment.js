const CommentModel =require('../models/comment.js');
const TopicModel =require('../models/topic.js');

exports.commentNew = function(req,res){
  res.render('新热门话题',{
    title:'新热门话题'
  })
};

exports.new = function(req,res,next){
  let comment = new CommentModel(req.body);
  comment
    .save()
    .then((comment)=>{
      res.json({
        state:'success',
        comment
      })
    })
    .catch((err)=>{
      next(err)
    })
};

exports.commentList = function(req,res,next){
  CommentModel
    .find({})
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

exports.commentProfile = function(req,res,next){
  let _id=req.params._id;
  CommentModel
    .findById(_id)
    .populate('topic','title')
    .exec()
    .then(function(comment){
      res.render('comment-profile',{
        title:'评论详情',
        comment
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.addSub = function(req,res,next){
  let _id=req.params._id;
  CommentModel
    .findById(_id)
    .exec()
    .then(function(comment){
      comment.sub.push(req.body);
      return comment.save()
    })
    .then(function(comment){
      res.json({
        state:'success',
        sub:comment.sub
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.delSub = function(req,res,next){
  let _id=req.params._id;
  let sub_id = req.body.sub_id;
  console.log(sub_id);
  CommentModel
    .findById(_id)
    .exec()
    .then(function(comment){
      let i=0,j;
      for(;i<comment.sub.length;i++){
        if(comment.sub[i]._id===sub_id){
          j=i;
        }
      }
      comment.sub.splice(j,1);
      return comment.save()
    })
    .then(function(comment){
      res.json({
        state:'success',
        sub:comment.sub
      })
    })
    .catch(function(err){
      next(err)
    })
};