(function() {
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      filesize = require('gulp-filesize'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      del = require('del'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload,
      less = require('gulp-less'),
      path = require('path');

  // vars for finding directories
  var match = {
    recurse: '**/*'
  };

  var src = './src/',
      dist = './dist/',
      demos = './demo/',
      tmp = './.tmp/',
      tmpBuild = tmp + 'build/';

  var srcAll = src + match.recurse,
      distAll = dist +match.recurse,
      demoAll = demos + match.recurse,
      tmpAll = tmpBuild + match.recurse;

  var srcJS = src + match.recurse + '.js',
      srcLess = src + '/less/' + match.recurse + '.less';

  var outputJS = 'dom.js';

  var buildSource = [
    src + '*.js',
    src + 'directives/**/*.js',
    src + 'services/**/*.js'
  ];


  var concatSource = function(outputDest) {
    return gulp
            .src(buildSource)
            .pipe(concat(outputJS))
            .pipe(filesize())
            .pipe(gulp.dest(outputDest || dist));
  };

  var minifyDist = function(outputDest) {
    return gulp
            .src(dist + outputJS)
            .pipe(uglify().on('error', gutil.log))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(filesize())
            .pipe(gulp.dest(outputDest || dist));
  };

  gulp.task('clean', function() {
    return del([distAll, tmpAll], function(err, paths) {
      return gutil.log('cleaned files/folders:\n', paths.join('\n'), gutil.colors.green());
    });
  });

  gulp.task('jshint', function() {
    return gulp
            .src(srcJS)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
  });

  // gulp.task('less', ['clean'], function () {
  //   return gulp
  //           .src(srcLess)
  //           .pipe(less({
  //             paths: [ path.join(__dirname, 'less', 'includes') ]
  //           }))
  //           .pipe(gulp.dest(dist));
  // });

  gulp.task('build', ['clean', 'jshint'], function () {
    return concatSource();
  });

  gulp.task('min', ['build'], function() {
    return minifyDist();
  });

  gulp.task('min-and-reload', ['min'], reload);

  gulp.task('serve', function() {
    browserSync({
       server: {
         baseDir: './'
       }
     });

     // TODO: live-reloading for demo not working yet.
     gulp.watch([srcAll, distAll, demoAll], ['min-and-reload']);
  });


  gulp.task('_tmp-build', function() {
    return concatSource(tmpBuild);
  });


  gulp.task('_tmp-min', ['_tmp-build'], function() {
    return minifyDist(tmpBuild);
  });

  gulp.task('prep-diff', ['_tmp-min'], function() {
    // nothing here atm.
  });


  gulp.task('default', ['min', 'serve']);

})();
