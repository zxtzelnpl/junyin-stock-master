const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema=mongoose.Schema;

const PictureSchema = new Schema({
  name:String,
  teacher:String,
  ask:String,
  phone:String,
  answer:String,
  answerAt:String,
  meta:{

    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

PictureSchema.pre('save',function(next){
  let comment=this;
  if(comment.isNew){
    comment.meta.createAt = comment.meta.updateAt = Date.now()
  }else{
    comment.meta.updateAt = Date.now();
  }
  next()
});

module.exports = PictureSchema;