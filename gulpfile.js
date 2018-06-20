var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
    sass: ['./scss/ionic.app.scss','./www/**/*.scss','!./www/lib/**/*'],
    css: './www/content/css'
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        // .pipe(gulp.dest(paths.css))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.css))
        .on('end', done);
});

gulp.task('watch', ['sass'], function () {
    gulp.watch(paths.sass, ['sass']);
});