'use strict';

var path     = require('path');
var gulp     = require('gulp');
var express  = require('express');
var del      = require('del');
var sass     = require('gulp-sass');
var neat     = require('node-neat').includePaths;
var concat   = require('gulp-concat');
var jsonlint = require('gulp-jsonlint');
var deploy   = require('gulp-gh-pages');
var imagemin = require('gulp-imagemin');
var notify   = require('gulp-notify');
var cache    = require('gulp-cache');
var uglify   = require('gulp-uglify');
var swig     = require('swig');
var serve    = require('gulp-serve');
var build    = require('./build');

var bases = {
  build: '_build',
  dist: '../_public'
}

var paths = {
  scss: ['sass/screen.scss'],
  jsfiles: [
    '_bower_components/jquery/jquery.min.js',
    '_bower_components/listjs/dist/list.min.js',
    '_bower_components/imagesloaded/imagesloaded.pkgd.min.js',
    '_bower_components/masonry/dist/masonry.pkgd.min.js',
    'assets/js/site.js',
    'assets/js/site-filter.js',
    'assets/js/site-filter-faceted.js',
    'assets/js/anchor.min.js'

  ],
  jsonfiles: ['../content/data/*.json'],
  imagesdir: ['assets/images/photographs/*/*/*'],
  fontdir: ['assets/font/*']
};


gulp.task('clean', function (cb) {
  return del('_build/assets', cb);
});


gulp.task('assets:sass', ['clean'], function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      errLogToConsole: true,
      includePaths: ['styles'].concat(neat),
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(bases.build + '/assets/css'));
});

gulp.task('assets:scripts', ['clean'], function() {
  return gulp.src(paths.jsfiles)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(bases.build + '/assets/js'))
});

//moves images to _build directory
// gulp.task('assets:images',  ['clean'], function() {
//   return gulp.src(paths.imagesdir)
//   .pipe(gulp.dest(bases.build + '/assets/images'));
// });

// gulp.task('assets:images', function() {
//   return gulp.src(paths.imagesdir)
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest(bases.build + '/assets/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });


gulp.task('assets:fonts',  ['clean'], function() {
  return gulp.src(paths.fontdir)
  .pipe(gulp.dest(bases.build + '/assets/font'));
});

//Runs the tasks above
gulp.task('assets', ['assets:sass','assets:scripts',  'assets:fonts'], function(){

    notify({ message: 'Assets task complete' });

});

//Lint JSON
gulp.task('lint:json', function() {
  return gulp.src(paths.jsonfiles)
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

// _build function, run lint above
gulp.task('build:metalsmith', ['assets', 'lint:json'], function(done) {
  build(function(err){
    if (err) return err;
    console.log('Metalsmith building... Done.');
    done();
  });
});

// Runs _build, assets
gulp.task('build', ['build:metalsmith'], function() {
  // return gulp.src(['../content/**/*'])
  //   .pipe(gulp.dest(bases.dist));
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(bases.dist + '/**/*')
    .pipe(deploy())
    .pipe(notify({ message: 'build complete' }));
});

//SERVE
gulp.task('serve', ['watch', 'build'], function() {
  var port = process.env.NODE_PORT || 3575;
  var app = express();
  app.set('view cache', false);
  swig.setDefaults({cache: false});
  app.use(express.static(path.join(__dirname, bases.dist)));
  app.listen(port);
  console.log('Server running on localhost:%d...', port);
});

// gulp.task('serve', ['watch','assets'], serve('_public'));
// gulp.task('serve-build', serve(['public', 'build']));
// gulp.task('serve-prod', serve({
//     root: ['_public', 'build'],
//     port: 80,
//     middleware: function(req, res) {
//         // custom optional middleware
//     }
// }));

//WATCH
gulp.task('watch', function() {
  gulp.watch([
    'sass/**/*',
    'layouts/**/*'
  ], ['build']);
});

gulp.task('default', ['serve']);
