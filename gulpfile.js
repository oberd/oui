'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var fs = require('fs');
var es = require('event-stream');
var path = require('path');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var myth = require('gulp-myth');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var rjs = require('requirejs');

// Clean task (destroys all build artifacts)
gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false}).pipe(clean());
});

// Require.js Optimizer
gulp.task('requirejs', ['clean'], function (cb) {
  rjs.optimize({
    baseUrl: 'src',
    paths: {
      'jquery': '../bower_components/jquery/dist/jquery',
      'underscore': '../bower_components/underscore/underscore',
      'backbone': '../bower_components/backbone/backbone',
      'react': '../bower_components/react/react-with-addons',
      'react.backbone': '../bower_components/react.backbone/react.backbone',
      'JSXTransformer': '../bower_components/react/JSXTransformer',
    },
    jsx: {
      fileExtension: '.jsx'
    },
    shim: {
      'backbone': { 'deps': ['underscore', 'jquery'] }
    },
    optimize: 'none',
    include: ['../bower_components/almond/almond', 'Clinical'],
    exclude: ['jquery', 'underscore', 'backbone', 'react', 'react.backbone'],
    out: 'dist/oberd-ui.js',
    wrap: {
      'startFile': 'tools/wrap.start',
      'endFile': 'tools/wrap.end'
    }
  }, function (buildResponse) {
    require('fs').writeFileSync(__dirname + '/dist/build-info.txt', buildResponse);
    cb();
  }, cb);
});

gulp.task('test-config', function () {
  var all = [];
  gulp.src(['test/spec/**/*.spec.js'])
    .pipe(es.through(function (data) {
      var dir = path.relative(__dirname + '/test', path.dirname(data.path));
      var name = path.basename(data.path, '.js');
      all.push(dir + '/' + name);
      this.emit(data);
    }, function () {
      var testConfig = 'var tests = ' + JSON.stringify(all) + ';';
      fs.writeFileSync(__dirname + '/test/test-files.js', testConfig);
      this.emit('end');
    }));
});

// Headless testing for pre-commit hook
//
var mochaPhantomJS = require('gulp-mocha-phantomjs');
gulp.task('test', ['build-test'], function () {
  return gulp.src('test/index.html').pipe(mochaPhantomJS());
});

// Uglify for the minified version
//
gulp.task('min', ['requirejs'], function () {
  return gulp
    .src('dist/oberd-ui.js')
    .pipe(uglify())
    .pipe(rename('oberd-ui.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(size({ showFiles: true }));
});

gulp.task('myth-examples', function () {
  return gulp.src('examples/styles.myth.css')
    .pipe(myth())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('examples/css/dist'));
});

gulp.task('myth-library', function () {
  return gulp.src('src/**/*.myth.css')
        .pipe(myth())
        .pipe(gulp.dest('dist'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('myth', ['myth-library', 'myth-examples']);

gulp.task('build-test', ['test-config']);
gulp.task('build', ['min']);

gulp.task('serve', function () {
  gulp.watch(['src/**/*.js', 'test/spec/**/*.js'], ['test']);
  gulp.watch(['src/**/*.myth.css'], ['myth-library']);
  gulp.watch(['examples/styles.myth.css'], ['myth-examples']);
  var server = require('superstatic')();
  server.listen(function () {
    gutil.log('Examples accessible: http://localhost:' + server.port + '/examples/example.html');
    gutil.log('Tests accessible: http://localhost:' + server.port + '/test/index.html');
  });
});

gulp.task('default', ['build']);

