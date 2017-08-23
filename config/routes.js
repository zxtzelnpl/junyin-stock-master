var User=require('../controllers/user');
var Room=require('../controllers/room');
var Video=require('../controllers/video');
var Admin=require('../controllers/admin');
var Index=require('../controllers/index');


module.exports=function(app){
  /*请求预处理*/
  app.use(function(req,res,next){
    app.locals.admin = req.session.admin;
    next()
  });

  /**前端页面**/
  app.get('/room/:room',Index.index);
  app.get('/more',Index.more);

  /**手机API**/
  app.get('/mobile/:room',Index.mobile);
  app.get('/mobile-video/:vid',Index.video);

  /**后台页面**/
  app.get('/admin/login',Admin.login);
  app.get('/admin/loginout',Admin.loginOut);
  app.post('/admin/signin',Admin.signIn);
  app.get('/admin/welcome',Admin.adminRequired,Admin.welcome);
  
  /*用户相关*/
  app.get('/admin/user-new',Admin.adminRequired,User.userNew);
  app.get('/admin/user-update/:_id',Admin.adminRequired,User.userUpdate);
  app.get('/admin/user-profile/:_id',Admin.adminRequired,User.userProfile);
  app.post('/user/new',Admin.adminRequired,User.new);
  app.post('/user/update',Admin.adminRequired,User.update);
  app.get('/admin/user-list',Admin.adminRequired,User.userList);
  
  /*房间相关*/
  app.get('/admin/room-new',Admin.adminRequired,Room.roomNew);
  app.get('/admin/room-update/:_id',Admin.adminRequired,Room.roomUpdate);
  app.get('/admin/room-profile/:_id',Admin.adminRequired,Room.roomProfile);
  app.post('/room/new',Admin.adminRequired,Room.new);
  app.post('/room/update',Admin.adminRequired,Room.update);
  app.get('/admin/room-list',Admin.adminRequired,Room.roomList);

  /*视频相关*/
  app.get('/admin/video-new/:room_id',Admin.adminRequired,Video.videoNew);
  app.get('/admin/video-update/:_id',Admin.adminRequired,Video.videoUpdate);
  app.post('/video/new',Admin.adminRequired,Video.new);
  app.post('/video/update',Admin.adminRequired,Video.update);

  app.get('/test',function(req,res){

  });



  app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
  });

  app.use(function(err, req, res) {
    if(err.stack){
      res.status(500).send('Something broke!<br>'+err.stack.replace(/[\n]+/g,'<br>'));
    }else{
      res.status(500).send(err)
    }

  });

};