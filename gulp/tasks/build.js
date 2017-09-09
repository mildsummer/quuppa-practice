var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var config  = require('../config');

// リリース時はこれを叩く
gulp.task('clean', function() {
  return del('build'); // buildディレクトリを削除後に生成開始
});

gulp.task('build', function(){
  config.isBuildFlag = true;
  // pathの上書き
  config.dist.root = config.build.root;
  config.dist.html = config.build.html;
  config.dist.css = config.build.css;
  config.dist.js = config.build.js;

  return runSequence(['clean'], [
    'html',
    'css',
    'js'
  ]);
});
