const gulp = require('gulp');

const plumber=require('gulp-plumber');
const less=require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

const reload=browserSync.reload;

const config=require('./gulp.config.js');

/**
 * Compile only project files for front,excluding all third-party dependencies.
 */

function dev(){
  gulp.task('front-js:dev',function(){
    return gulp.src(config.front.js)
      .pipe(gulp.dest(config.public.js))
      .pipe(reload({stream:true}));
  });
  gulp.task('front-less:dev', function () {
    return gulp.src(config.front.css)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less({
        'strict-math': 'on'
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.public.css))
      .pipe(reload({stream:true}));
  });
  gulp.task('front-img:dev',function(){
    return gulp.src(config.front.img)
      .pipe(gulp.dest(config.public.img))
      .pipe(reload({stream:true}));
  });

  /**
   * Compile only project files for admin,excluding all third-party dependencies.
   */
  gulp.task('admin-js:dev',function(){
    return gulp.src(config.admin.js)
      .pipe(gulp.dest(config.public.js))
      .pipe(reload({stream:true}));
  });
  gulp.task('admin-less:dev', function () {
    return gulp.src(config.admin.css)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less({
        'strict-math': 'on'
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.public.css))
      .pipe(reload({stream:true}));
  });
  gulp.task('admin-img:dev',function(){
    return gulp.src(config.admin.img)
      .pipe(gulp.dest(config.public.img))
      .pipe(reload({stream:true}));
  });

  /**
   * vendor
   */
  gulp.task('vendor:dev', function () {
    return gulp.src([
      config.vendor
    ])
      .pipe(gulp.dest(config.public.vendor));
  });

  /**
   * ueditor
   */
  gulp.task('ueditor:dev', function () {
    return gulp.src([
      config.ueditor
    ])
      .pipe(gulp.dest(config.public.dir));
  });

  /**
   * nodemon
   */
  gulp.task('nodemon', function () {
    nodemon({
      script: 'app.js'
      , ext: 'js pug'
      , ignore: [
        'public/'
        , 'src/'
        , 'node_modules/'
      ]
      , env: {'NODE_ENV': 'development'}
    }).on('restart',function(){
      console.log('##########Let us reload################');
      reload();
    })
  });

  /**
   * server-watch
   */
  gulp.task('server-watch',['front-less:dev','front-img:dev','front-js:dev','admin-js:dev','admin-less:dev','admin-img:dev','vendor:dev','nodemon'], function() {
    const files=[
      'views/**/*.pug'
    ];

    browserSync.init({
      proxy: "localhost:3000/admin/welcome",
      notify: false,
      port: 3001
    });

    gulp.watch(config.front.js, ['front-js:dev']);
    gulp.watch(config.front.css, ['front-less:dev']);
    gulp.watch(config.front.img, ['front-img:dev']);
    gulp.watch(config.admin.js, ['admin-js:dev']);
    gulp.watch(config.admin.css, ['admin-less:dev']);
    gulp.watch(config.admin.img, ['admin-img:dev']);
    gulp.watch(files).on("change", reload);
  });
}

module.exports=dev;