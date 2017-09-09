var gulp = require('gulp');
var runSequence = require('run-sequence');

var config  = require('../config');

// default
gulp.task('default', function() {
  return runSequence([
    'server',
    'html',
    'css',
    'js',
    'watch'
  ]);
});
