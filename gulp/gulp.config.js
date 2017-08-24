const paths={
  front:{
    js:'src/front/js/*.js',
    css:'src/front/css/*.less',
    img:'src/front/img/**/*.*'
  },
  admin:{
    js:'src/admin/js/*.js',
    css:'src/admin/css/*.less',
    img:'src/admin/img/**/*.*'
  },
  vendor:'src/vendor/**/**.*',
  public:{
    js:'public/js',
    css:'public/css',
    img:'public/img',
    vendor:'public/vendor',
    dir:'public'
  },
  clean:'public',
  normalize: 'node_modules/normalize.css/normalize.css',
  ueditor:'src/ue/**'
};

module.exports=paths;