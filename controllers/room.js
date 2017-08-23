var RoomModel = require('../models/room.js');
var VideoModel = require('../models/video.js');

exports.roomList = function(req,res,next){
  RoomModel
    .find({})
    .exec()
    .then(function(rooms){
      res.render('room-list',{
        title:'房间列表',
        rooms:rooms
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.roomNew = function(req,res){
  res.render('room-new',{
    title:'增加新的房间'
  })
};

exports.roomUpdate = function(req,res,next){
  var _id = req.params._id;
  RoomModel
    .findOne({_id:_id})
    .exec()
    .then(function(room){
      res.render('room-new',{
        title:'房间信息修改',
        room:room
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.roomProfile = function(req,res,next){
  var _id=req.params._id;
  var roomPromise=RoomModel
    .findOne({_id:_id})
    .exec();
  var videoPromise=VideoModel
    .find({room:_id})
    .exec();
  Promise
    .all([roomPromise,videoPromise])
    .then(function([room,videos]){
      var url = 'http://videos.jyzqsh.com/room/' +room.name;
      res.render('room-profile',{
        title:'房间详情',
        room:room,
        videos:videos,
        url:url
      })
    })
    .catch(function(err){
      next(err)
    })
};

exports.new = function(req,res,next){
  var room =new RoomModel(req.body);
  room
    .save()
    .then(function(room){
      res.redirect('/admin/room-profile/'+room._id)
    })
    .catch(function(err){
      next(err)
    })
};

exports.update = function(req,res,next){
  var roomObj = req.body;
  RoomModel
    .findOne({_id:roomObj._id})
    .exec()
    .then(function(room){
      Object.assign(room,roomObj);
      return room.save()
    })
    .then(function(room){
      res.redirect('/admin/room-profile/'+room._id)
    })
    .catch(function(err){
      next(err)
    })
};
