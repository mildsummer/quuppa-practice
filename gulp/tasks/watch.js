var gulp = require('gulp');

var config  = require('../config');

// watch
gulp.task('watch', function(){

  // html
  gulp.watch([
    config.src.html + '**/*.pug',
    '!' + config.src.html + '_layout/**/*',
    '!' + config.src.html + '_element/**/*'
  ], function() {
    // ejs個別
    config.isHtmlAllFlag = false;
    gulp.start('html');
  });

  gulp.watch([
      config.src.html + '_layout/**/*.pug',
      config.src.html + '_element/**/*.pug'
    ], function() {
    // ejs全体
    config.isHtmlAllFlag = true;
    gulp.start('html');
  });

  // css
  gulp.watch(config.src.css + '**/*', ['css']);

  // js
  gulp.watch(config.src.js + '**/*', ['js']);
  // gulp.watch( setPath.distDir + '**/*' , reload);
});
