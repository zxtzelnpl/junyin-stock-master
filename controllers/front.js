exports.detail = function(req,res){
  res.render('detail-page',{
    title:'文章详情',
    hotComments:[1,2,3],
    allComments:[1,2,3]
  })
};