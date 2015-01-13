'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var fs = require('fs');
var es = require('event-stream');
var path = require('path');
var _ = require('underscore');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var myth = require('gulp-myth');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var rjs = require('requirejs');
var flatten = require('gulp-flatten');

// Clean task (destroys all build artifacts)
gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false}).pipe(clean());
});

var requireConfig = {
  paths: {
    'Oui': 'src',
    'docs': 'docs/src',
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'react': 'bower_components/react/react-with-addons',
    'react.backbone': 'bower_components/react.backbone/react.backbone',
    'text': 'bower_components/requirejs-text/text',
    'JSXTransformer': 'tools/JSXTransformer',
    'jsx': 'bower_components/jsx-requirejs-plugin/js/jsx',
    'backbone-filtered-collection': 'bower_components/backbone-filtered-collection/backbone-filtered-collection',
    'json': 'bower_components/requirejs-plugins/src/json',
    'mdown': 'bower_components/requirejs-plugins/src/mdown',
    'highlightjs': 'bower_components/highlightjs/highlight.pack',
    'chance': 'bower_components/chance/chance',
    'markdownConverter': 'bower_components/requirejs-plugins/lib/Markdown.Converter'
  },
  jsx: {
    fileExtension: '.jsx'
  },
  stubModules: ['jsx'],
  shim: {
    'backbone': { 'deps': ['underscore', 'jquery'] }
  },
  optimize: 'none'
};

// Require.js Optimizer

gulp.task('requirejs', ['clean'], function (cb) {
  rjs.optimize(_.extend(requireConfig, {
    include: ['bower_components/almond/almond', 'Oui/Oui'],
    exclude: ['jquery', 'underscore', 'backbone', 'react', 'react.backbone', 'backbone-filtered-collection', 'JSXTransformer', 'text'],
    out: 'dist/oui.js',
    wrap: {
      'startFile': 'tools/wrap.start',
      'endFile': 'tools/wrap.end'
    }
  }), function (buildResponse) {
    require('fs').writeFileSync(__dirname + '/dist/build-info.txt', buildResponse);
    cb();
  });
});

gulp.task('clean-docs', function () {
  return gulp.src(['docs/css/dist'], {read: false}).pipe(clean());
});
gulp.task('clean-docs-js', function () {
  return gulp.src(['docs/js/build.js'], {read: false}).pipe(clean());
});
gulp.task('requirejs-docs', ['clean-docs-js'], function (cb) {
  rjs.optimize(_.extend(requireConfig, {
    include: ['docs/main'],
    out: 'docs/src/build.js'
  }), function (buildResponse) {
    require('fs').writeFileSync(__dirname + '/dist/build-info.txt', buildResponse);
    cb();
  });
});

// Traverses test folder looking for matching test files and
// dumps them for running
//
gulp.task('test-config', function () {
  var all = [];
  gulp.src(['test/spec/**/*.spec.{js,jsx}'])
    .pipe(es.through(function (data) {
      var dir = path.relative(__dirname + '/test', path.dirname(data.path));
      var name = path.basename(data.path);
      if (name.match(/jsx$/)) {
        dir = 'jsx!' + dir;
      }
      name = name.replace(/\.(js|jsx)$/, '');
      all.push(dir + '/' + name);
      this.emit(data);
    }, function () {
      var testConfig = 'var tests = ' + JSON.stringify(all) + ';';
      fs.writeFileSync(__dirname + '/test/test-files.js', testConfig);
      this.emit('end');
    }));
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

// Stylesheet compilation
//
gulp.task('myth-docs', ['clean-docs'], function () {
  return gulp.src('docs/css/styles.myth')
    .pipe(myth())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('docs/css/dist'));
});
gulp.task('myth-globals', ['clean'], function () {
  return gulp
    .src('src/*.myth')
    .pipe(myth())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('myth-library', ['clean', 'myth-globals'], function () {
  return gulp.src('src/**/*.myth')
        .pipe(myth())
        .pipe(flatten())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('oui.css'))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('myth', ['myth-library', 'myth-docs']);

// Copy icon fonts
gulp.task('icomoon-fonts', ['clean'], function () {
  return gulp.src(['assets/icomoon/fonts/*']).pipe(gulp.dest('dist/fonts'));
});

// Add conditional support for IE7 via separate files in dist
//
gulp.task('ie7-js', ['clean'], function () {
  return gulp.src(['assets/icomoon/ie7/*.js']).pipe(concat('ie7.js')).pipe(gulp.dest('dist'));
});
gulp.task('ie7-css', ['clean'], function () {
  return gulp.src(['assets/icomoon/ie7/*.css'])
    .pipe(concat('ie7.css'))
    .pipe(gulp.dest('dist'));
});
gulp.task('ie7', ['ie7-js', 'ie7-css']);


// Headless testing for pre-commit hook
//
var mochaPhantomJS = require('gulp-mocha-phantomjs');
gulp.task('test', ['test-config'], function () {
  return gulp.src('test/index.html').pipe(mochaPhantomJS());
});
gulp.task('build', ['myth', 'min', 'requirejs-docs', 'ie7', 'icomoon-fonts']);

gulp.task('serve', ['build'], function () {
  gulp.watch(['src/**/*.js', 'test/spec/**/*.js'], ['test']);
  gulp.watch(['src/**/*.myth'], ['myth-library']);
  gulp.watch(['docs/**/*.myth'], ['myth-docs']);
  var server = require('superstatic')({ "cache_control": false });
  server.listen(function () {
    var base = 'http://' + server.host + ':' + server.port;
    gutil.log('Documentation accessible: ' + base + '/docs');
    gutil.log('Tests accessible: ' + base + '/test');
  });
});

gulp.task('default', ['build']);

