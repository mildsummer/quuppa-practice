var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var cached = require('gulp-cached');
var reload = browserSync.reload;
var dir = require('require-dir');

var config  = require('../config');

// html
// var ejs = require("gulp-ejs");
var pug = require("gulp-pug");

gulp.task('html', function() {
  var rootPath = config.root;
  var index = Object.keys(dir(config.root + config.src.html)).filter(function(name) {
      return name !== 'index';
  });
  gulp.src([
    config.src.html + '**/*.pug',
    '!' + config.src.html + '_element/**/*',
    '!' + config.src.html + '_layout/**/*'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル。ejs全体の時は使わない
    .pipe(gulpif( !config.isHtmlAllFlag , cached('pug') ))
    .pipe(pug({
      // 出力ファイルが整形される
      pretty: true,
      // includeなどをルートパスで書けるようにする
      basedir: rootPath,
      // pugに変数を渡す場合
      locals: {
        'index': index,
        'rootPath': rootPath
      }
    }))
    .pipe(gulp.dest(config.dist.html))
    .on('end', reload);
});
