const browserify = require("browserify");
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');



gulp.task('browser-bundle', function() {
  return browserify('./src/browser-bundle.js', {debug: true})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('uni-corn-browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
});


gulp.task('browser-bundle-min', function() {
  return browserify('./src/browser-bundle.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('uni-corn-browser.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('module-bundle', function() {
  return browserify(['./src/Store.js'], {standalone: 'Store', debug: true})
    .transform('babelify', {presets: ['es2015']})
    .require("./src/updater")
    .bundle()
    .pipe(source('uni-corn.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('module-bundle-min', function() {
  return browserify('./src/Store.js', {standalone: 'Store'})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('uni-corn.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', [
  // 'browser-bundle', 
  'browser-bundle-min',
  // 'module-bundle', 
  'module-bundle-min'
]);
