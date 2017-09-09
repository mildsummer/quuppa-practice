# プロジェクトベース

##使い方

### gulpをインストール

```
$ npm install -g gulp
```

### npmで開発環境パッケージをインストール

プロジェクトのディレクトリに移動して

```
$ npm install
```

### bowerでJavascriptパッケージをインストール

```
$ bower install
```

### composerでPHPパッケージをインストール

```
$ composer install
```

### gulpタスクの実行・ローカルサーバー立ち上げ・監視

```
$ gulp
```

### 外部のJavascriptライブラリを使う方法

bowerでインストール後、gulp/config.jsのsrc.libにパスを配列で格納する。

### 納品ファイル生成

cssのminifyや、.mapなどを省いたファイルを生成

```
$ gulp build
```

### ディレクトリ構成

srcを編集。

+ jade -> html
+ js -> babel -> js
+ sass -> css

```
├── .git/
├── .gitignore
│
├── gulpfile.js
├── gulp/
│   └── config.js（出力構成などを制御するファイル）
├── build/（納品ファイルがここに生成される）
├── .distribution/（ビルド後のソース）
│   ├── javascripts,stylesheets,images/ 等
│   └── index.html
│
├── package.json
├── node_modules/
│   └── パッケージ各種
│
├── .bowerrc
├── bower.json
├── vendors/
│   ├── bower_components/ bowerコンポーネント（JSライブラリ）
│   └── composer_components/ composerコンポーネント（PHPライブラリ）
│
├── plugins/ composerプラグイン（PHPライブラリ）
│
├── source/（ビルド前のソース）
│   ├── _template/（共通パーツのhtml）
│   │    ├── _header.jade
│   │    ├── _footer.jade
│   │    └── _layout.jade
│   ├── images/ 画像（写真など）
│   ├── materials/ 画像（その他）
│   │    └── _sprites/ スプライト用画像
│   ├── javascripts/
│   │    └── main.js
│   ├── stylesheets/
│   │    ├── _partial/ （共通パーツのcss）
│   │    └── style.scss
│   └── index.jade など（htmlは拡張子をjadeにする）
│
└── README.md
```

