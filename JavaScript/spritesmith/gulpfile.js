'use strict';

const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const sass = require('gulp-sass');

const originalImages = 'img/*.png'; // これらの画像を結合する。

gulp.task('sprite', () => {
  const spritesmithParam = {
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    // imgPath: '../img-dist/sprite.png' // ここで指定したパスが、CSSのbackgrond-image: url(XXX)のXXXの部分に入る。
  };

  return gulp.src(originalImages)
    .pipe(spritesmith(spritesmithParam))
    .pipe(gulp.dest('generated'));
});

gulp.task('sprite-scss', () => {
  const spritesmithParam = {
    imgName: 'sprite.png',
    cssName: 'sprite.scss' // 拡張子をscssにするだけで、scss形式で出力される。
  };

  return gulp.src(originalImages)
    .pipe(spritesmith(spritesmithParam))
    .pipe(gulp.dest('generated-scss'));
});

gulp.task('compile-scss', ['sprite-scss'], () => {
  return gulp.src('my-style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('compiled-css'));
});
