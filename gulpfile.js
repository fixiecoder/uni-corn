const browserify = require("browserify");
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('javascript', function() {
  return browserify('./src/Store.js', {standalone: 'Store'})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('./src/Store.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('uni-corn.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['javascript']);