var UserModel = require('../models/user.js');

exports.userList = function (req, res, next) {
  UserModel
    .find({})
    .exec()
    .then(function (users) {
      res.render('user-list', {
        title: '用户列表',
        users: users
      })
    })
    .catch(function (err) {
      next(err)
    })
};

exports.userNew = function (req, res) {
  res.render('user-new', {
    title: '增加新的用户'
  })
};

exports.userUpdate = function (req, res, next) {
  var _id = req.params._id;
  UserModel
    .findOne({_id: _id})
    .exec()
    .then(function (user) {
      res.render('user-new', {
        title: '用户信息修改',
        user: user
      })
    })
    .catch(function (err) {
      next(err)
    })
};

exports.userProfile = function (req, res, next) {
  var _id = req.params._id;
  UserModel
    .findOne({_id: _id})
    .exec()
    .then(function (user) {
      res.render('user-profile', {
        title: '用户详情',
        user: user
      })
    })
    .catch(function (err) {
      next(err)
    });
};

exports.new = function (req, res, next) {
  var _user = req.body;
  var user = new UserModel(_user);
  user
    .save()
    .then(function (user) {
      res.redirect('/admin/user-profile/' + user._id)
    })
    .catch(function (err) {
      next(err)
    })
};

exports.update = function (req, res, next) {
  var userObj = req.body;
  UserModel
    .findOne({_id: userObj._id})
    .exec()
    .then(function (user) {
      Object.assign(user, userObj);
      return user.save()
    })
    .then(function (user) {
      res.redirect('/admin/user-profile/' + user._id)
    })
    .catch(function (err) {
      next(err)
    });
};