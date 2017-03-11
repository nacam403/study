'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');

const jsPath = './src/js/**/*.js';

gulp.task('eslint', function() {
  return gulp.src([jsPath])
    .pipe(eslint({
      fix: true // ルール違反があった時、自動修正可能なルールだったら自動修正する。
    }))
    .pipe(eslint.format()) // 結果表示を見やすく整形する。
    .pipe(gulpIf(file => file.eslint.fixed, gulp.dest('./src/js'))) // 自動修正されたファイルがあれば、その結果を保存する。
    .pipe(eslint.failAfterError()); // errorレベルのルール違反があったらgulpタスクを停止する。
});

gulp.task('watch', ['eslint'], function() {
  gulp.watch(jsPath, ['eslint']);
});

gulp.task('default', ['watch']);
