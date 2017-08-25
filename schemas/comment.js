const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  praise:{
    type:Number,
    default:0
  },
  content:String,
  sub:[
    {
      name:String,
      content:String
    }
  ],
  topic:{
    type:ObjectId,
    ref:'Topic'
  },
  meta: {
    createAt: {
      type: Date
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});



CommentSchema.pre('save',function(next){
  let comment=this;
  if(comment.isNew){
    comment.meta.createAt = comment.meta.updateAt = Date.now()
  }else{
    comment.meta.updateAt = Date.now();
  }
  next()
});

module.exports = CommentSchema;