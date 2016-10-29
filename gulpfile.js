var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var data = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var del = require('del');
var rename = require('gulp-rename');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var handlebarsOpts = {
	batch : ['./partials/']
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

function log(data){
  console.log(data);
  return data;
}

gulp.task('styles', function() {
    gulp.src('styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./docs/'))
        .pipe(reload({ stream:true }));
});

gulp.task('images', function() {
  return gulp.src('./img/**')
      .pipe(newer('./docs/img'))
      .pipe(imagemin())
      .pipe(gulp.dest('./docs/img'))
      .pipe(reload({ stream:true }));;

});

gulp.task('js', function() {
  gulp.src('./scripts/*.js')
    .pipe(babel({presets: ['es2015']})).on('error', function(err) {
      console.error('Error in babel task', err.toString());
    })

    .pipe(uglify()).on('error', function(err) {
      console.error('Error in uglify task', err.toString());
    })

    .pipe(gulp.dest('./docs/scripts/'))
    .pipe(reload({ stream:true }));
});

gulp.task('compile', function() {
	del('./docs/index.html')
	gulp.src('./base.html')
	.pipe(data( function(file) {
		return requireUncached('./work.json');
	}))
	.pipe(handlebars({},handlebarsOpts))
	.pipe(rename('index.html'))
	.pipe(gulp.dest('./docs/'))
	.pipe(reload({ stream:true }));
})

gulp.task('serve', ['compile','styles','js'], function() {
  browserSync({
    server: {
      baseDir: 'docs'
    }
  });

  gulp.watch('./scripts/*.js', ['js'])
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch('img/**/*', ['images']);
  gulp.watch(['./base.html','./partials/*.handlebars', './work.json'], ['compile']);
});