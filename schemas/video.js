var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var reg=/([\S]*\/id_)([\S]+)(\.html[\S]*)/gi;

var Schema=mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var VideoSchema = new Schema({
  title:String,
  url:String,
  room:{
    type: ObjectId
    , ref: 'Room'
    , required:true
  },
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

VideoSchema.virtual('vid').get(function(){
  var str=this.url;

  return str.replace(reg,function(reg,$1,$2,$3){
    return $2
  });
});

VideoSchema.set('toJSON',{getters:true,virtual:true});


VideoSchema.pre('save', function (next) {
  var user = this;
  if (user.isNew) {
    user.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    user.meta.updateAt = Date.now();
  }
  next();
});

module.exports = VideoSchema;