'use strict';

var gulp   = require('gulp'),
  concat   = require('gulp-concat'),//replaced by the useref task
  uglify   = require('gulp-uglify'),
  rename   = require('gulp-rename'),
    sass   = require('gulp-sass'),
    maps   = require('gulp-sourcemaps'),
     del   = require('del'),
imagemin   = require('gulp-imagemin'),
    csso   = require('gulp-csso'),
      bs   = require("browser-sync").create(),
  reload   = bs.reload;

// // ==> BROWSERsync <==
  //Browsersync watch task to reload the page when changes are made to the js or sass
bs.watch('./js').on('change', reload);
bs.watch('./sass').on('change', reload);
// // ==> BROWSERsync <==

// --this is for concatinating javascript
gulp.task("concatScripts", function(){
  return gulp.src([
      'js/global.js',
      'js/circle/autogrow.js',
      'js/circle/circle.js'
    ])
  .pipe(maps.init())
  .pipe(concat("all.js"))//all.js
  .pipe(maps.write('./'))
  .pipe(gulp.dest("js"));
});
  // run above in the console as : == gulp concatScripts
// --this is for concatinating javascript

// --this is for minifying the previously created all.js file
gulp.task("scripts", ['concatScripts'], function(){
  return gulp.src("js/all.js")
      .pipe(maps.init())
      .pipe(uglify())
      .pipe(rename('all.min.js'))//all.min.js
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/js'));
});
  //run above in the console as : == gulp minifyScripts
// --this is for minifying the previously created all.js file

// --this is for compiling sass into a css file/folder
gulp.task("compileSass", function(){
  return gulp.src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(rename('all.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'));
});
//     run above in the console as : == gulp compileSass
// --this is for compiling sass into a css file/folder

// --this is for minifying the previously created css
gulp.task("styles", ['compileSass'], function(){
  return gulp.src("dist/css/all.css")
    .pipe(maps.init())
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'));
});
//     run above in the console as : == gulp styles
// --this is for minifying the previously created css

// --this is for compressing image files
gulp.task('images', function(){
  return gulp.src(['images/*','images/*/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});
// --this is for compressing image files

//--this is for compressing icon files
gulp.task('icons', function(){
  return gulp.src(['icons/*','icons/*/*'])
    .pipe(gulp.dest('dist/icons'))
});
//--this is for compressing icon files

// --this is for watching all files outlined in the watchfiles task
gulp.task('watchFiles', function (){
  gulp.watch(['sass/**/*.scss'], ['styles']);
  gulp.watch('js/**/*.js', ['scripts']);
})
// --this is for watching all files outlined in the watchfiles task

// --deletes the dist folder
gulp.task('clean', function() {
  del(['dist']);
  del(['js/all.js','js/all.js.map']);
});
// --deletes the dist folder

// --The build task deletes the current dist folder then runs the dependencies
// and generates the new dist folder while maintaining the file/folder structure
// as indicated by the base: './' option
gulp.task("build", ['clean', 'scripts', 'styles', 'images', 'icons'], function() {
  return gulp.src(['index.html'], { base: './'})
             .pipe(gulp.dest('dist'));
});
// --The build task deletes the current dist folder then runs the dependencies
// and generates the new dist folder while maintaining the file/folder structure
// as indicated by the base: './' option

// --runs the gulp server with the watchFiles task as a dependancy
gulp.task('serve', ['watchFiles', 'scripts', 'styles'], function(){
  // http-server -p 3000 ... ( // this serves the code on port 3000 )
    bs.init({
      server: {
        baseDir: './dist'
      },
      //delay to accomodate the browser note loading before the tasks have finished
      reloadDelay: 1000,
    });
  });
// --runs the gulp server with the watchFiles task as a dependancy

// --gulp default will delete dist folder then run build task and serve task
gulp.task('default', ['clean'], function() {
  gulp.start(['build', 'serve']);
});
// --gulp default will delete dist folder then run build task and serve task
