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
var pump = require('pump');
var autoprefixer = require('gulp-autoprefixer');



var handlebarsOpts = {
	batch : ['./partials/'],
  helpers : {
    isDev:function(t){
      return (t === 'dev');
    }
  }
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}


gulp.task('styles', function(cb) {
  pump([
     gulp.src('styles/main.scss'),
     sass(),
     autoprefixer(),
     gulp.dest('./docs/'),
     reload({ stream:true })
    ], cb);
});

gulp.task('images', function(cb) {
  pump([
     gulp.src('./img/**'),
     newer('./docs/img'),
     imagemin(),
     gulp.dest('./docs/img'),
     reload({ stream:true })
    ], cb);
});

gulp.task('js', function(cb) {
    pump([
     gulp.src('./scripts/*.js'),
     babel({presets: ['es2015']}),
     uglify(),
     gulp.dest('./docs/scripts/'),
     reload({ stream:true })
    ], cb);

});

gulp.task('compile', function(cb) {
	del('./docs/index.html')
  pump([
     gulp.src('./base.html'),
     data( function(file) {
        return requireUncached('./work.json');
      }),
     handlebars({},handlebarsOpts),
     rename('index.html'),
     gulp.dest('./docs/'),
     reload({ stream:true })
    ], cb);

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
  gulp.watch(['./base.html','./partials/*.hbs', './work.json'], ['compile']);
});