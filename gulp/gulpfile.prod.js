const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

const config = require('./gulp.config.js');

function prov() {
  gulp.task('front-js:prod', function () {
    return gulp.src(config.front.js)
      .pipe(uglify())
      .pipe(gulp.dest(config.public.js))
  });
  gulp.task('front-less:prod', function () {
    return gulp.src(config.front.css)
      .pipe(less({
        'strict-math': 'on'
      }))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest(config.public.css))
  });
  gulp.task('front-img:prod', function () {
    return gulp.src(config.front.img)
      .pipe(gulp.dest(config.public.img))
  });

  /**
   * Compile only project files for admin,excluding all third-party dependencies.
   */
  gulp.task('admin-js:prod', function () {
    return gulp.src(config.admin.js)
      .pipe(uglify())
      .pipe(gulp.dest(config.public.js))
  });
  gulp.task('admin-less:dev', function () {
    return gulp.src(config.admin.css)
      .pipe(less({
        'strict-math': 'on'
      }))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest(config.public.css))
  });
  gulp.task('admin-img:prod', function () {
    return gulp.src(config.admin.img)
      .pipe(gulp.dest(config.public.img))
  });


  /**
   * normalize
   */
  gulp.task('normalize:prod', function () {
    return gulp.src(config.normalize)
      .pipe(cssmin())
      .pipe(gulp.dest(config.public.css));
  });

  /**
   * vender
   */
  gulp.task('model:prod', function () {
    return gulp.src([
      'src/model/**/**.*'
    ])
      .pipe(gulp.dest('public/vendor'));
  });


  /**
   * delete the pre public
   */
  gulp.task('clean', function () {
    return gulp.src([config.public.css, config.public.js, config.public.img])
      .pipe(clean());
  });


  /**
   * public
   */
  gulp.task('produce',['model:prod','normalize:prod','admin-img:prod','admin-less:dev','admin-js:prod','front-img:prod','front-less:prod','front-js:prod'], function () {
    console.log('Everything is finished');
  });
}

module.exports = prov;