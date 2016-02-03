var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var path = {
  cssSrc:          'src/css/main.scss',
  cssDev:          'dev/css',
  cssProduction:   'build/css',
  cssWatch:        'src/css/**/*.scss',
  htmlSrc:         'src/**/*.html',
  htmlDev:         'dev',
  htmlProduction:  'build',
  htmlWatch:       'src/**/*.html'
};

var autoprefixerConfig = {
  browsers: ['last 2 versions']
}

gulp.task('css-dev', function(){
  gulp.src(path.cssSrc)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(autoprefixerConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.cssDev))
})

gulp.task('html-dev', function(){
  gulp.src(path.htmlSrc)
    .pipe(gulp.dest(path.htmlDev))
})

gulp.task('watch', function(){
  gulp.watch(path.cssWatch, ['css-dev']);
  gulp.watch(path.htmlWatch, ['html-dev']);
})

gulp.task('css-production', function(){
  gulp.src(path.cssSrc)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulp.dest(path.cssProduction))
})

gulp.task('html-production', function(){
  gulp.src(path.htmlSrc)
    .pipe(gulp.dest(path.htmlProduction))
})

gulp.task('default', ['css-dev', 'html-dev', 'watch']);
gulp.task('build', ['css-production', 'html-production']);