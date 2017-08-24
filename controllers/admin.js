var UserModel = require('../models/user.js');

exports.login = function (req, res) {
  res.render('login', {
    title: '登录界面'
  })
};

exports.loginOut = function (req, res) {
  delete req.session.admin;
  res.render('login', {
    title: '登录界面'
  })
};

exports.welcome = function (req, res) {
  res.render('welcome', {
    title: '欢迎页面欢迎欢迎dada'
  })
};

exports.signIn=function(req,res,next){
  var userObj=req.body;
  var _user;
  UserModel
    .findOne({name:userObj.name})
    .exec()
    .then(function(user){
      if(!user){
        res.json({
          state:'fail',
          err:'无法查找到此用户'
        })
      }else{
        _user=user;
        return user.comparePassword(userObj.password)
      }
    })
    .then(function(isMatch){
      console.log(isMatch);
      console.log(arguments);
      if(isMatch){
        req.session.admin=_user;
        res.json({
          state:'success'
        })
      }else{
        res.json({
          state:'fail',
          err:'密码错误'
        })
      }
    })
    .catch(function(err){
      next(err)
    })
};

exports.adminRequired =function(req,res,next){
  // if(req.session.admin){
  //   next()
  // }
  // else{
  //   next('页面不存在')
  // }
  next()
};