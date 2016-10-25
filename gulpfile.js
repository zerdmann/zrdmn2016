var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var data = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var del = require('del');
var rename = require('gulp-rename');

var handlebarsOpts = {
	batch : ['./partials']
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

gulp.task('styles', function() {
    gulp.src('styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./release/'))
        .pipe(reload({ stream:true }));
});

gulp.task('images', function() {
  return gulp.src('./img/**')
      .pipe(newer('./release/img'))
      .pipe(imagemin())
      .pipe(gulp.dest('./release/img'));

});


gulp.task('compile', function() {
	del('./release/index.html')
	gulp.src('./base.html')
	.pipe(data( function(file) {
		return requireUncached('./work.json');
	}))
	.pipe(handlebars())
	.pipe(rename('index.html'))
	.pipe(gulp.dest('./release/'))
	.pipe(reload({ stream:true }));
})

gulp.task('serve', ['compile','styles'], function() {
  browserSync({
    server: {
      baseDir: 'release'
    }
  });

  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch(['./base.html','./partials/*.html', './work.json'], ['compile']);
});