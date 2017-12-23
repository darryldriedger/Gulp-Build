'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),//replaced by the useref task
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
imagemin = require('gulp-imagemin'),
    csso = require('gulp-csso');

// this is for concatinating tasks SHOULD BE NAMED scripts ONLY
    gulp.task("concatScripts", function(){
      return gulp.src([
          'js/global.js',
          'js/circle/autogrow.js',
          'js/circle/circle.js'
        ])
      // .pipe(maps.init())
      .pipe(concat("all.js"))//all.js
      // .pipe(maps.write('./'))
      .pipe(gulp.dest("js"))
    })
    // run above in the console as : == gulp concatScripts
// this is for concatinating tasks

// // this is for minifying the previously created app.js file
    gulp.task("scripts", ['concatScripts'], function(){
      return gulp.src("js/all.js")
          .pipe(uglify())
          .pipe(maps.init())
          .pipe(rename('all.min.js'))//all.min.js
          .pipe(maps.write('./'))
          .pipe(gulp.dest('dist/js'));
    });
//     //run above in the console as : == gulp minifyScripts
// // this is for minifying the previously created app.js file

//this is for compiling sass through gulp
    gulp.task("compileSass", function(){
      return gulp.src("sass/global.scss")
        // .pipe(maps.init())
        .pipe(sass())
        .pipe(rename('all.min.css'))//all.min.js
        // .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/css'))
    });
//     run above in the console as : == gulp compileSass

//this is for compiling sass through gulp
    gulp.task("styles", ['compileSass'], function(){
      return gulp.src("dist/css/all.min.css")
        .pipe(maps.init())
        .pipe(csso())
        // .pipe(rename('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/css'))
    });
//     run above in the console as : == gulp compileSass

//This is for compressing image files
gulp.task("images", function(){
  return gulp.src("images/*")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});
//This is for compressing image files

//This is for compressing icon files
// gulp.task("icons", function(){
//   return gulp.src("icons/**")
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/icons'))
// });
//This is for compressing icon files


// this is for watching all files outlined in the watchfiles code
gulp.task('watchFiles', function (){
  gulp.watch(['sass/**/*.scss'], ['styles']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch(['images/**/*'], ['images']);
  // gulp.watch('icons/**/*', ['icons']);
})
// this is for watching all files outlined in the watchfiles code

gulp.task('clean', function() {
  return del(['dist']);
});

//need to figure out how to transfer the source folders without the source folder itself
gulp.task("build", ['clean', 'scripts', 'styles', 'images'], function() {
  return gulp.src(['index.html'], { base: './'})
             .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);
//http-server -p 3000
// this runs the code on port 3000

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
