const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  title:String,
  brief:String,
  content:String,
  views:{
    type:Number,
    default:0
  },
  praise:{
    type:Number,
    default:0
  },
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});


TopicSchema.pre('save',function(next){
  let topic = this;
  if(topic.isNew){
    topic.meta.createAt = topic.meta.updateAt = Date.now()
  }else{
    topic.meta.updateAt = Date.now();
  }
  next()
});

module.exports = TopicSchema;