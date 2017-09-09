var gulp = require('gulp');
var browserSync = require('browser-sync');

var config  = require('../config');

gulp.task('server', function() {
    browserSync({
        server: {
          baseDir: config.dist.root
        },
        ui: {
          port: 9001
        },
        port: 9000,
        open: false,
        scroll: false
    });
});