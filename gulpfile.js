var
  // modules
  gulp = require('gulp'),
  fs = require('fs'),
  createFile = require('create-file'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  notify = require('gulp-notify'),
  deporder = require('gulp-deporder'),
  concat = require('gulp-concat'),
  stripdebug = require('strip-debug'),
  uglify = require('uglify-js'),
  webpackStream = require('webpack-stream'),
  webpack = require('webpack');
  browserSync = require('browser-sync').create(),
  nodemon = require('nodemon'),
  webpackCongif = require('./webpack.config.js'),

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'public/'
  }
;

// gulp.task('build', ['serve'], function() {

//   console.log('build');

//   var jsbuild = gulp.src(folder.src + 'server/index.js')
//     .pipe(webpackStream( webpackCongif, webpack ));
    
//   if (!devBuild) {
//     jsbuild = jsbuildbul
//       .pipe(stripdebug())
//       .pipe(uglify());
//   }

//   return jsbuild.pipe(gulp.dest(folder.build));
// });

gulp.task('serve', function () {

  // fs.stat(folder.build + 'server.js', function(err, stat) { 
  //   if (err !== null) { 
  //     createFile(folder.build + 'server.js', '', function (err) {
  //       // file either already exists or is now created (including non existing directories) 
  //     });
  //   } 
  // });

  nodemon({
    script: 'server.js'
  , watch: 'server.js'
  })
    .on('restart', function onRestart() {
        // Also reload the browsers after a slight delay
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);
    });
});

gulp.task('browser-sync', ['serve'], function() {

    var files = ['./src/**/*.js', './src/scss/*.scss'];

    browserSync.init(files, {
        proxy: "localhost:3009"
    });
});

gulp.task('jsclient', function() {

  var jsbuild = gulp.src(folder.src + 'index.js')
    .pipe(deporder())
    .pipe(concat('index.js'))
    .pipe(webpackStream( webpackCongif, webpack ));
    

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build));

});

// CSS processing
gulp.task('css', ['images'], function() {

  var postCssOpts = [
  assets({ loadPaths: ['client/images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'client/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(folder.build + 'css/'));
});

gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'client/images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

gulp.task('watch', function() {

  // javscript module changes
  gulp.watch(folder.src + 'scss/**/*.scss', ['css']);

  // javscript client index changes
  gulp.watch(folder.src + '**/*.js', ['jsclient']);

});

gulp.task('default', ['jsclient', 'css', 'browser-sync', 'watch']);