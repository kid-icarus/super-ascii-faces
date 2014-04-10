// Gulp!!!
var gulp = require('gulp');

// Mad plugins!!!
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon')

//Server - nodemon
gulp.task('develop', function () {
  nodemon({ script: 'index.js', ext: 'js'})
    .on('restart', function () {
      console.log('restarted!')
    })
})

// Minify
gulp.task('minify', function() {
  gulp.src('./app/*.html')
    .pipe(usemin({
      cssmin: minifyCss(),
      htmlmin: minifyHtml(),
      jsmin: uglify()
    }))
    .pipe(gulp.dest('./dist'));

  gulp.src('./app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));

  gulp.src('./app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

// JavaScripts
gulp.task('js', function() {
  gulp.src('./app/js/index.js')
    .pipe(browserify({
      insertGlobals : true,
      extensions: ['.html']
    }))
    .on('error', function(err) {
      this.emit('end');
    })
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app/js'))
    .pipe(livereload());
});

// Sass
gulp.task('compass', function() {
  gulp.src('./app/sass/*.scss')
    .pipe(compass({
      css: 'app/css',
      sass: 'app/sass',
      image: 'app/img',
      require: ['singularitygs', 'breakpoint']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
  var server = livereload();

  gulp.watch('./app/*.html', function(evt) {
      server.changed(evt.path);
  });
  gulp.watch('./app/tpl/*.html', function(evt) {
      server.changed(evt.path);
  });
  gulp.watch('./app/js/*.js', ['js']);
  gulp.watch('./app/sass/*.scss', ['compass']);
  gulp.watch('./app/sass/**/*.scss', ['compass']);
});

gulp.task('default', ['compass', 'js', 'watch']);

gulp.task('build', ['minify'])
