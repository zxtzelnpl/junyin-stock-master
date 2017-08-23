var RoomModel = require('../models/room.js');
var VideoModel = require('../models/video.js');

exports.videoNew = function(req,res,next){
  var room_id=req.params.room_id;
  RoomModel
    .findById(room_id)
    .exec()
    .then(function(room){
      res.render('video-new',{
        title:'上传新的视频',
        room:room
      })
    })
    .catch(function(err){
      next(err)
    });
};

exports.videoUpdate = function(req,res,next){
  var _id=req.params._id;
  VideoModel
    .findById(_id)
    .populate('room','name')
    .exec()
    .then(function(video){
      res.render('video-new',{
        room:video.room,
        video:video
      })
    })
    .catch(function(err){
      next(err)
    });
};

exports.new = function(req,res,next){
  var video = new VideoModel(req.body);
  console.log(video);
  video
    .save()
    .then(function(video){
      console.log(video);
      res.redirect('/admin/room-profile/'+video.room)
    })
    .catch(function(err){
      next(err)
    });
};

exports.update = function(req,res,next){
  var videoObj = req.body;
  VideoModel
    .findById(videoObj._id)
    .exec()
    .then(function(video){
      Object.assign(video,videoObj);
      return video.save()
    })
    .then(function(video){
      res.redirect('/admin/room-profile/'+video.room)
    })
    .catch(function(err){
      next(err)
    })
};