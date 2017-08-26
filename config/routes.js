const User=require('../controllers/user');
const Room=require('../controllers/room');
const Video=require('../controllers/video');
const Admin=require('../controllers/admin');
const Index=require('../controllers/index');
const Front=require('../controllers/front');
const Topic=require('../controllers/topic');
const Comment=require('../controllers/comment');
const Question=require('../controllers/question');

module.exports=function(app){
  /**请求预处理**/
  app.use(function(req,res,next){
    app.locals.admin = req.session.admin;
    next()
  });

  /**前端页面**/
  app.get('/detail/:_id',Front.detail);
  app.get('/hot',Front.hot);
  app.get('/edit',Front.edit);
  app.get('/room/:room',Index.index);
  app.get('/more',Index.more);

  /**后台页面**/
  app.get('/admin/login',Admin.login);
  app.get('/admin/loginout',Admin.loginOut);
  app.post('/admin/signin',Admin.signIn);
  app.get('/admin/welcome',Admin.adminRequired,Admin.welcome);

  /**热门话题**/
  app.get('/topic/praise/:_id',Topic.praise);//热门话题点赞
  app.get('/admin/topic-new',Admin.adminRequired,Topic.topicNew);//新建立新的热门话题-页面
  app.post('/topic/new',Admin.adminRequired,Topic.new);//新建立新的热门话题-数据
  app.get('/admin/topic-profile/:_id',Admin.adminRequired,Topic.topicProfile);//热门话题详情页面
  app.get('/admin/topic-update/:_id',Admin.adminRequired,Topic.topicUpdate);//热门话题更新-页面
  app.post('/topic/update',Admin.adminRequired,Topic.update);//热门话题更新-数据
  app.get('/admin/topic-list',Admin.adminRequired,Topic.topicList);//热门话题列表页面
  app.delete('/topic/del/:_id',Admin.adminRequired,Topic.delete);//热门话题删除


  /**评论管理**/
  app.post('/comment/new/',Comment.new);//用户发来新的评论
  app.get('/comment/praise/:_id',Comment.praise);//用户点赞
  app.get('/admin/comment-list/',Admin.adminRequired,Comment.commentList);//评论列表
  app.get('/admin/comment-profile/:_id',Admin.adminRequired,Comment.commentProfile);//评论详情页面
  app.delete('/comment/del/:_id',Admin.adminRequired,Comment.delete);//删除整个评论
  app.post('/comment/add-sub/:_id',Admin.adminRequired,Comment.addSub);//增加老师评论
  app.post('/comment/del-sub/:_id',Admin.adminRequired,Comment.delSub);//删除老师评论

  /**问答管理**/
  app.get('/question/new',Question.new);//用户发来新的问题
  app.get('/question/list',Question.jsonpList);//手机端获得所有问题的列表
  app.get('/admin/question-list/',Admin.adminRequired,Question.questionList);//问题列表
  app.get('/admin/question-profile/:_id',Admin.adminRequired,Question.questionProfile);//问题的详情页面
  app.post('/question/answer/:_id',Admin.adminRequired,Question.answer);//问题的回答
  app.delete('/question/del/:_id',Admin.adminRequired,Question.delete);//删除问题

  /**用户相关**/
  app.get('/admin/user-new',Admin.adminRequired,User.userNew);
  app.get('/admin/user-update/:_id',Admin.adminRequired,User.userUpdate);
  app.get('/admin/user-profile/:_id',Admin.adminRequired,User.userProfile);
  app.post('/user/new',Admin.adminRequired,User.new);
  app.post('/user/update',Admin.adminRequired,User.update);
  app.get('/admin/user-list',Admin.adminRequired,User.userList);

  /**手机API**/
  app.get('/mobile/:room',Index.mobile);
  app.get('/mobile-video/:vid',Index.video);
  
  /**房间相关**/
  app.get('/admin/room-new',Admin.adminRequired,Room.roomNew);
  app.get('/admin/room-update/:_id',Admin.adminRequired,Room.roomUpdate);
  app.get('/admin/room-profile/:_id',Admin.adminRequired,Room.roomProfile);
  app.post('/room/new',Admin.adminRequired,Room.new);
  app.post('/room/update',Admin.adminRequired,Room.update);
  app.get('/admin/room-list',Admin.adminRequired,Room.roomList);

  /**视频相关**/
  app.get('/admin/video-new/:room_id',Admin.adminRequired,Video.videoNew);
  app.get('/admin/video-update/:_id',Admin.adminRequired,Video.videoUpdate);
  app.post('/video/new',Admin.adminRequired,Video.new);
  app.post('/video/update',Admin.adminRequired,Video.update);

  app.get('/test',function(req,res){

  });



  app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
  });

  app.use(function(err, req, res, next) {
    if(err.stack){
      res.status(500).send('Something broke!1<br>'+err.stack.replace(/[\n]+/g,'<br>'));
    }else{
      res.status(500).send('Something broke!2<br>'+err)
    }
  });

};