var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function (cb) {
    gulp
        .src('less/fage.less')
        .pipe(less())
        .pipe(gulp.dest("./"));
    cb();
});

gulp.task (
    'default',
    gup.series('less', function (cb) {
        gulp.watch('less/*.less', gulp.series('less'));
        cb();
    })
);