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
  public:{
    js:'public/js',
    css:'public/css',
    img:'public/img'
  },
  clean:'public',
  normalize: 'node_modules/normalize.css/normalize.css'
};

module.exports=paths;