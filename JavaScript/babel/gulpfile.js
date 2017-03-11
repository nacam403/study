'use strict';

const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const vinyl = require('vinyl-source-stream');

const jsPath = './src/js/**/*.js';

gulp.task('default', ['watch']);

gulp.task('watch', ['browserify'], function() {
  gulp.watch(jsPath, ['browserify']);
});

gulp.task('browserify', function() {
  browserify({
    entries: ['src/js/app.js'],
    debug: true // source mapを出力する。
  })
  .transform(babelify)
  .bundle()
  .pipe(vinyl('index.js'))
  .pipe(gulp.dest('./dest'));
});
