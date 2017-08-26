const path = require('path');

/**定义常量*/
const port = process.env.PORT || 3000;
const dbUrl = require('./config/database');
console.log(dbUrl);
const secret='stock';

/**外部引入*/
const mongoose = require('mongoose');
const express = require('express');
const cookieParser=require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectMongo=require('connect-mongo');
const moment=require('moment');
const ueditor=require('ueditor');

/**引如内部路由**/
const routes = require('./config/routes');

/**链接数据库*/
mongoose.connect(dbUrl);
mongoose.connection.on('connected',function(){
  console.log('MongoDateBase connection success!')
});

/**建立app对象*/
const app=express();

/**建立session持久化*/
const mongoStore = connectMongo(session);
const sessionStore = new mongoStore({
  mongooseConnection:mongoose.connection,
  collection:'session',
  ttl:14*24*60*60
});
const sessionMiddleware=session({
  secret:secret,
  resave:true,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge:14*24*60*60*1000
  }
});

/**parseCookie建立并加密*/
const parseCookie = cookieParser(secret);

/**模板文件*/
app.set('views','./views');
app.set('view engine','pug');

/**中间件*/
app.use(parseCookie);
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname,'public')));
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //客户端上传文件设置
  let imgDir = '/img/ueditor/';
  let ActionType = req.query.action;
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    let file_url = imgDir;//默认图片上传地址
    /*其他上传格式的地址*/
    if (ActionType === 'uploadfile') {
      file_url = '/file/ueditor/'; //附件
    }
    if (ActionType === 'uploadvideo') {
      file_url = '/video/ueditor/'; //视频
    }
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    let dir_url = imgDir;
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    // console.log('config.json')
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));


/**路由文件*/
routes(app);

/**local变量*/
app.locals.moment=moment;

/**开发环境*/

if('development' === app.get('env')){
  console.log(app.get('env'));
  app.set('showStackError',true);
  app.locals.pretty = true;
  mongoose.set('debug',true)
}

/**服务器端口监听start*/
app.listen(port,function(){
  console.log('The stock management is start on port '+ port);
});