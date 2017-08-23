var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    index:true
  },
  password: {
    type:String,
    required:true
  },
  note:String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isNew) {
    user.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    user.meta.updateAt = Date.now();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash;
      next()
    })
  })
});

UserSchema.methods = {
  comparePassword: function (_password) {
    return bcrypt.compare(_password, this.password)
  }
};

module.exports = UserSchema;
