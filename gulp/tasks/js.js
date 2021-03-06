var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var gulpif = require('gulp-if');

var config  = require('../config');

// javascripts
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


gulp.task('js', function(){
  // エラーメッセージ
  var errorMsg = function() {
    var args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
      title: "Compile Error",
      message: "<%= error %>"
    }).apply(this, args);
    // Keep gulp from hanging on this task
    this.emit('end');
  };
  gulp.src(config.src.js + '*.js')
  .pipe(named())
  .pipe(webpackStream({
      module: {
        rules: ["imports-loader?this=>window"],
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
          }
        ],
        // babel Loaderを指定してWebpackがBabelのコンパイルをできるように
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets: ['es2015']
            }
          },
          {
            test: /\.svg|.csv$/,
            exclude: /node_modules/,
            loader: "raw-loader"
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
      ]
    }))
  .on('error', errorMsg)
  .pipe(plumber())
  .pipe(buffer())
  .pipe(gulpif(config.isBuildFlag, uglify({preserveComments:'some'}))) // minify＆ライセンスコメント残す
  .pipe(gulp.dest(config.dist.js))
  .pipe(browserSync.reload({stream: true}));
  return gulp.src(config.src.js + '*.json')//jsonをコピー
    .pipe(gulpif(!config.isBuildFlag, gulp.dest(config.dist.js)));
});
