var gulp = require('gulp');
var bower = require('gulp-bower');
var bowerMain = require('main-bower-files');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var del = require('del');


gulp.task('clean', function() {
    del.sync('app/lib/');
});

gulp.task('bower', function() {
    return bower();
});

gulp.task('build', ['bower', 'clean'], function() {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    gulp
        .src(bowerMain())
        .pipe(jsFilter)
        .pipe(gulp.dest('app/lib/js'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest('app/lib/css'));

});