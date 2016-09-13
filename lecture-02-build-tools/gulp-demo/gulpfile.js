'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('hello', function(){
  console.log('hello world');
});

gulp.task('test', function(){
  gulp.src('./test/*-test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('dev', function(){
  gulp.watch(['**/*.js','!node_modules/**'], ['lint', 'test']);
});

gulp.task('default', ['dev']);
