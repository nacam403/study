'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const server = require('gulp-server-livereload');
const eslint = require('gulp-eslint');
const vinyl = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');

const sourceDir = 'src';
const jsDir = 'src/js';
const jsFilePattern = 'src/js/**/*.js';
const entryJs = 'src/js/main.js';

const destinationDir = 'dest';
const bundledJs = 'index.js';

gulp.task('default', ['server']);

gulp.task('server', ['watch'], function() {
  gulp.src([sourceDir, destinationDir])
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', ['browserify'], function() {
  gulp.watch(jsFilePattern, ['browserify']);
});

gulp.task('browserify', ['eslint'], function() {
  browserify({
    entries: [entryJs],
    debug: true // source mapを出力する。
  })
  .transform(babelify)
  .bundle()
  .pipe(vinyl(bundledJs))
  .pipe(gulp.dest(destinationDir));
});

gulp.task('eslint', function() {
  return gulp.src([jsFilePattern])
    .pipe(plumber())
    .pipe(eslint({
      fix: true // ルール違反があった時、自動修正可能なルールだったら自動修正する。
    }))
    .pipe(eslint.format()) // 結果表示を見やすく整形する。
    .pipe(gulpIf(file => file.eslint.fixed, gulp.dest(jsDir))); // 自動修正されたファイルがあれば、その結果を保存する。
});
