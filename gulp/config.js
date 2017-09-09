var src     = 'source/';      // 元ファイル
var dist    = '.distribution/';     // コンパイル先
var build = 'build/';  // リリース時

// root path
var root = require( 'path' ).join( __dirname, '../' );

module.exports = {
  // root
  'root' : root,

  // flag処理
  'isBuildFlag' : false,
  'isEjsAllFlag'  : true,

  'src': {
    'root'  : src,
    'html'  : src,
    'css'   : src + 'stylesheets/',
    'img'   : src + 'images/',
    'sprite': src + 'materials/_sprites/*.png',
    'js'    : src + 'javascripts/'
  },

  'dist': {
    'root'  : dist,
    'html'  : dist,
    'css'   : dist + 'css/',
    'img'   : dist + 'img/',
    'sprite': dist + 'materials/',
    'js'    : dist + 'js/'
  },

  'build': {
    'root'  : build,
    'html'  : build,
    'css'   : build + 'css/',
    'img'   : build + 'img/',
    'sprite': build + 'materials/',
    'js'    : build + 'js/'
  },

  // copyするファイル
  'copy': [
    '**/*.json',
    '**/*.ico',
    'source/fonts/*.*',
    'source/movies/*.*',
    'source/unity/**/*.*',
    'source/video-js/**/*.*'
  ]

};
