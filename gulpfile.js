var gulp = require('gulp');
var bower = require('gulp-bower');
var bowerMain = require('main-bower-files');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var del = require('del');

// パッケージインストール
gulp.task('bower-install', function() {
    return bower();
});

// パッケージ更新
gulp.task('bower-update', function() {
    return bower({cmd:'update'});
});

// パッケージ削除
gulp.task('bower-clean', function() {
    del.sync('bower_components/');
});

// ビルド
gulp.task('build', ['clean', 'bower-install'], function() {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    gulp
        .src(bowerMain())
        .pipe(jsFilter)
        .pipe(gulp.dest('app/lib/js'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest('app/lib/css'))
        .pipe(cssFilter.restore);
});

//
gulp.task('clean', function() {
    del.sync('app/lib/');
});

// 更新ビルド
gulp.task('update', ['clean', 'bower-update', 'build']);

// リビルド
gulp.task('rebuild', ['clean', 'bower-clean', 'build']);

// デフォルト
gulp.task('default', ['build']);
