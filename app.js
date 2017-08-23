const path = require('path');

/**定义常量*/
const port = process.env.PORT || 3000;
const dbUrl = 'mongodb://localhost/stock';
const secret='stock';

/**外部引入*/
const mongoose = require('mongoose');
const express = require('express');
const cookieParser=require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectMongo=require('connect-mongo');
const moment=require('moment');

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
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname,'public')));

/**路由文件*/
routes(app);

/**local变量*/
app.locals.moment=moment;

/**开发环境*/
if('development' === app.get('env')){
  app.set('showStackError',true);
  app.locals.pretty = true;
  mongoose.set('debug',true)
}

/**服务器端口监听start*/
app.listen(port,function(){
  console.log('The video management is start on port '+ port);
});